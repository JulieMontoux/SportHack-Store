import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // ou autre champ stocké

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👤 Mon Profil</h2>
      <div className="card p-4 shadow-sm">
        <p><strong>Nom d’utilisateur :</strong> {username || "Utilisateur connecté"}</p>
        <p><strong>Statut :</strong> Authentifié</p>
        <button
          className="btn btn-outline-danger mt-3"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          🔐 Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
