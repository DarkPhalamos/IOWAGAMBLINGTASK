import React from "react";

function Deck({ id, onClick }) {
  return <button onClick={() => onClick(id)}>Mazo {id}</button>;
}

export default Deck;
