import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const mode = localStorage.getItem("mode") || "vulnerable";
  const token = localStorage.getItem("token");

  const toggleMode = () => {
    const newMode = mode === "vulnerable" ? "securise" : "vulnerable";
    localStorage.setItem("mode", newMode);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">🏀 SportH@ck Store</Navbar.Brand>
        
        {/* Toggle button responsive */}
        <Navbar.Toggle aria-controls="navbar-content" />

        {/* Collapsible section */}
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profil</Nav.Link>
            <Nav.Link as={Link} to="/comments">Commentaires</Nav.Link>
            <Nav.Link as={Link} to="/scores">Scores</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Button variant="warning" onClick={toggleMode}>
              Mode : {mode.toUpperCase()}
            </Button>
            {token && (
              <Button variant="outline-light" onClick={handleLogout}>
                Déconnexion
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
