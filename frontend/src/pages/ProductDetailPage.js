import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Erreur produit :", err));
  }, [id]);

  if (!product) return <p className="text-center mt-5">Chargement du produit...</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card.Img
            src={product.image || "https://via.placeholder.com/400x300"}
            alt={product.name}
            style={{ maxHeight: 400, objectFit: "cover" }}
          />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4 className="text-success">{product.price} €</h4>
          <Button variant="primary">Ajouter au panier 🛒</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
