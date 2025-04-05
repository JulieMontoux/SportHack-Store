import React, { useState, useEffect } from "react";

const ModeBadge = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "vulnerable");

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === "vulnerable" ? "securise" : "vulnerable";
    setMode(newMode);
  };

  return (
    <button
      className={`btn btn-sm me-3 ${mode === "vulnerable" ? "btn-danger" : "btn-success"}`}
      onClick={toggleMode}
      title="Changer de mode d'application"
    >
      Mode : {mode.toUpperCase()}
    </button>
  );
};

export default ModeBadge;
