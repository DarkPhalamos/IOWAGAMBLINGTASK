import React from "react";

function History({ entries }) {
  return (
    <ul className="history">
      {entries
        .slice(-10)
        .reverse()
        .map((entry) => (
          <li key={entry.id}>
            Ronda {entry.id}: Elegiste <strong>{entry.deck}</strong> → +
            {entry.reward} /{" "}
            {entry.penalty !== 0 ? `${entry.penalty}` : "sin penalización"}={" "}
            <strong>{entry.total}</strong>
          </li>
        ))}
    </ul>
  );
}

export default History;
