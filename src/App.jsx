import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreTestForm from "./components/PreTestForm";
import ExportSecret from "./components/ExportSecret"; // este lo crearás en el siguiente paso

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreTestForm />} />
        <Route path="/export-secret" element={<ExportSecret />} />
      </Routes>
    </Router>
  );
}

export default App;
