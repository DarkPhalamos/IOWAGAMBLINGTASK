import React, { useState, useEffect, useRef } from "react"; // Añade useRef
import Deck from "./Deck";
import ScoreBoard from "./ScoreBoard";
import History from "./History";
import { decks } from "../data/deck";
import "../styles/Game.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Game({ formData }) {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [hasSaved, setHasSaved] = useState(false);
  const timeoutRef = useRef(null); // ✅ Aquí va el useRef

  const handleDeckClick = (deckId) => {
    const { reward, penalty } = decks[deckId];
    const penaltyValue = penalty();
    const total = reward + penaltyValue;

    const newEntry = {
      id: history.length + 1,
      deck: deckId,
      reward,
      penalty: penaltyValue,
      total,
    };

    setScore((prev) => prev + total);
    setHistory((prev) => [...prev, newEntry]);
    setLastResult(newEntry);

    // ✅ Limpiamos timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLastResult(null);
      timeoutRef.current = null;
    }, 2000);
  };

  const saveGameToFirebase = async () => {
    const count = { A: 0, B: 0, C: 0, D: 0 };
    history.forEach((entry) => {
      count[entry.deck]++;
    });

    const ventajosos = count.C + count.D;
    const desventajosos = count.A + count.B;
    const indice = ventajosos - desventajosos;

    const partida = {
      ...formData,
      elecciones: history,
      resumen: {
        A: count.A,
        B: count.B,
        C: count.C,
        D: count.D,
        ventajosos,
        desventajosos,
        indice,
      },
      puntuacionFinal: score,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "resultados"), partida);
      setHasSaved(true);
      console.log("✅ Partida guardada en Firebase.");
    } catch (error) {
      console.error("❌ Error al guardar en Firebase:", error);
    }
  };

  useEffect(() => {
    if (history.length === 100 && !hasSaved) {
      saveGameToFirebase();
    }
  }, [history, hasSaved]);

  // 🔁 Limpieza del timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="game-container">
      <h1>Iowa Gambling Task</h1>
      <ScoreBoard score={score} />

      {lastResult && (
        <div
          className={`result-card ${lastResult.total >= 0 ? "gain" : "loss"}`}
        >
          <p>
            <strong>Mazo {lastResult.deck}</strong>
          </p>
          <p>
            +{lastResult.reward} /{" "}
            {lastResult.penalty !== 0 ? lastResult.penalty : "sin penalización"}
          </p>
          <p>
            Total: <strong>{lastResult.total}</strong>
          </p>
        </div>
      )}

      <div className="deck-buttons">
        {Object.keys(decks).map((deckId) => (
          <Deck key={deckId} id={deckId} onClick={handleDeckClick} />
        ))}
      </div>

      {!hasSaved && history.length >= 20 && (
        <button onClick={saveGameToFirebase} style={{ marginTop: "2rem" }}>
          Finalizar y guardar partida
        </button>
      )}

      {hasSaved && <p style={{ marginTop: "2rem" }}>✅ Datos guardados.</p>}

      <h2>Historial</h2>
      <History entries={history} />
    </div>
  );
}

export default Game;
