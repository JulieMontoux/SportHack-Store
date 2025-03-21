import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const AppNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">🏀 SportH@ck Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>

          <Nav>
            {token ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUserCircle size={22} className="me-2" />
                  Mon profil
                </Nav.Link>
                <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button variant="light" onClick={() => navigate("/login")}>
                <FaUserCircle className="me-2" />
                Connexion
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
