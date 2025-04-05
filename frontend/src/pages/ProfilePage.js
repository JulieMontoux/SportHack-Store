import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p className="mt-4 text-center">Non connecté</p>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <Container className="mt-4">
      <h2>👤 Mon Profil</h2>
      <Card className="p-3 shadow-sm">
        <p>
          <strong>Email :</strong> {user.email}
        </p>
        <p>
          <strong>Rôle :</strong> {user.role}
        </p>
        <Button variant="outline-danger" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Card>
    </Container>
  );
};

export default ProfilePage;
