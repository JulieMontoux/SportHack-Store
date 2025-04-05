import React, { useState } from "react";
import api from "../services/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  const mode = localStorage.getItem("mode"); // "vulnerable" ou "securise"

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.triggered) {
        localStorage.setItem(res.data.triggered, "true");
      }

      setResponse({ success: true, message: `✅ Connexion réussie !` });
    } catch (err) {
      if (err.response?.status === 429) {
        const triggered = err.response.headers["x-ratelimit-triggered"];
        if (triggered) {
          localStorage.setItem(triggered, "true");
        }
        setResponse({
          success: false,
          message: "🚫 Trop de tentatives. Attendez avant de réessayer.",
        });
      } else {
        setResponse({
          success: false,
          message: "❌ Connexion échouée : Identifiants invalides",
        });
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">Connexion</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type={mode === "vulnerable" ? "text" : "email"}
            className="form-control"
            placeholder="Entrez votre email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type={mode === "securise" ? "password" : "text"}
            className="form-control"
            placeholder="Entrez votre mot de passe"
            value={password}
            // uniquement requis en mode sécurisé
            required={mode !== "vulnerable"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Connexion
        </button>
      </form>

      {response && (
        <div
          className={`alert mt-4 ${
            response.success ? "alert-success" : "alert-danger"
          }`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
