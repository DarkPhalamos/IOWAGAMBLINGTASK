import React, { useState } from "react";
import Deck from "./components/Deck";
import ScoreBoard from "./components/ScoreBoard";
import History from "./components/History";
import { decks } from "./data/deck";
import "./styles/main.css";
import * as XLSX from "xlsx";

function App() {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const handleDeckClick = (deckId) => {
    const { reward, penalty } = decks[deckId];
    const penaltyValue = penalty();
    const total = reward + penaltyValue;

    setScore((prev) => prev + total);
    setHistory((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        deck: deckId,
        reward,
        penalty: penaltyValue,
        total,
      },
    ]);

    setLastResult({
      deck: deckId,
      reward,
      penalty: penaltyValue,
      total,
    });

    setTimeout(() => {
      setLastResult(null);
    }, 2000);
  };

  const exportToExcel = () => {
    // Conteo de elecciones por mazo
    const count = { A: 0, B: 0, C: 0, D: 0 };
    history.forEach((entry) => {
      count[entry.deck]++;
    });

    const ventajosos = count.C + count.D;
    const desventajosos = count.A + count.B;
    const indice = ventajosos - desventajosos;

    const data = [
      [
        "ID",
        "Grupo",
        "Edad",
        "A",
        "B",
        "C",
        "D",
        "Ventajosos",
        "Desventajosos",
        "Índice",
        "Comentarios",
      ],
      [
        "01", // puedes generar o pedir este valor dinámicamente
        "Control",
        "25",
        count.A,
        count.B,
        count.C,
        count.D,
        ventajosos,
        desventajosos,
        indice > 0 ? `+${indice}` : indice,
        "Comentario ejemplo",
      ],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");
    XLSX.writeFile(workbook, "iowa-gambling-result.xlsx");
  };

  return (
    <div className="game-container">
      <h1>Iowa Gambling Task</h1>
      <ScoreBoard score={score} />

      {lastResult && (
        <div
          className={`result-card ${lastResult.penalty < 0 ? "loss" : "gain"}`}
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

      <button onClick={exportToExcel} style={{ marginTop: "2rem" }}>
        Exportar a Excel
      </button>

      <h2>Historial</h2>
      <History entries={history} />
    </div>
  );
}

export default App;
