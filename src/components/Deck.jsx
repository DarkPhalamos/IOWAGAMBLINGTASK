import React from "react";
import "../styles/Deck.css";

function Deck({ id, onClick, disabled }) {
  return (
    <button
      onClick={() => onClick(id)}
      disabled={disabled}
      className={`deck-button ${disabled ? "deck-disabled" : ""}`}
    >
      Mazo {id}
    </button>
  );
}

export default Deck;
