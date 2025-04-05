import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erreur chargement produits :", err));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🛍️ Tous nos articles de sport</h2>

      <InputGroup className="mb-4">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Row>
        {filtered.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description?.slice(0, 100)}...</Card.Text>
                <Card.Text>
                  <strong>{product.price} €</strong>
                </Card.Text>
                <Link to={`/product/${product.id}`} className="btn btn-outline-primary">
                  ➕ Détails & Achat
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListPage;
