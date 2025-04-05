import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const mode = localStorage.getItem("mode") || "vulnerable";
  const token = localStorage.getItem("token");

  const toggleMode = () => {
    const newMode = mode === "vulnerable" ? "secure" : "vulnerable";
    localStorage.setItem("mode", newMode);
    window.location.reload();
  };  

  const handleLogout = () => {
    localStorage.clear();
    navigate("/SportHack-Store/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/SportHack-Store/">
          🏀 SportH@ck Store
        </Navbar.Brand>

        {/* Toggle button responsive */}
        <Navbar.Toggle aria-controls="navbar-content" />

        {/* Collapsible section */}
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/SportHack-Store/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/SportHack-Store/profile">
              Profil
            </Nav.Link>
            <Nav.Link as={Link} to="/SportHack-Store/comments">
              Commentaires
            </Nav.Link>
            <Nav.Link as={Link} to="/SportHack-Store/scores">
              Scores
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Button
              variant={mode === "vulnerable" ? "danger" : "success"}
              onClick={toggleMode}
            >
              Mode : {mode === "vulnerable" ? "VULNÉRABLE" : "SÉCURISÉ"}
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
