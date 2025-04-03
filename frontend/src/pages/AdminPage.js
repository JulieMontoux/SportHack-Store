import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <Container className="mt-4">
      <h2>🔐 Espace Administrateur</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5>Gestion des Produits</h5>
            <p>Ajoutez, modifiez ou supprimez les produits du magasin.</p>
            <Link to="/admin/produits" className="btn btn-outline-primary">
              Gérer les Produits
            </Link>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5>Suivi des Commandes</h5>
            <p>Consultez et traitez les commandes clients.</p>
            <Link to="/admin/commandes" className="btn btn-outline-secondary">
              Gérer les Commandes
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;