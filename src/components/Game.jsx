import React, { useState, useEffect, useRef } from "react";
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
  const [gameEnded, setGameEnded] = useState(false);
  const timeoutRef = useRef(null);

  const handleDeckClick = (deckId) => {
    if (gameEnded) return;

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

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
      setGameEnded(true);
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
          <Deck
            key={deckId}
            id={deckId}
            onClick={handleDeckClick}
            disabled={gameEnded}
          />
        ))}
      </div>

      {!hasSaved && history.length >= 20 && (
        <button onClick={saveGameToFirebase} style={{ marginTop: "2rem" }}>
          Finalizar y guardar partida
        </button>
      )}

      {hasSaved && (
        <p style={{ marginTop: "2rem", color: "green" }}>
          ✅ Partida guardada correctamente. ¡Has completado los 100 turnos!
        </p>
      )}

      <h2>Historial</h2>
      <History entries={history} />
    </div>
  );
}

export default Game;
