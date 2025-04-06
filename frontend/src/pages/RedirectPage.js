import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetUrl = params.get("to");
    const mode = localStorage.getItem("mode");

    if (!targetUrl) {
      return navigate("/"); // Aucun paramètre ? Redirection home
    }

    const isInternal =
      /^\/(?!\/)/.test(targetUrl) || // commence par /
      /^https?:\/\/(localhost|127\.0\.0\.1|sporthack-store\.onrender\.com)/.test(targetUrl); // optionnel : autoriser domaine local

    if (mode === "securise" && !isInternal) {
      alert("🚫 Redirection externe bloquée en mode sécurisé !");
      navigate("/"); // ou rester sur place
    } else {
      // Redirection directe
      window.location.href = targetUrl;
    }
  }, [location, navigate]);

  return <p className="text-center mt-5">🔁 Redirection en cours...</p>;
};

export default RedirectPage;
