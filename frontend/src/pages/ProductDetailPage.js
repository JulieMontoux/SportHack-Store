import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Erreur produit :", err));
  }, [id]);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      currentCart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    setMessage("✅ Produit ajouté au panier !");
  };

  if (!product) return <p className="text-center mt-5">Chargement du produit...</p>;

  return (
    <Container className="mt-4">
      {message && <Alert variant="success">{message}</Alert>}
      <Row>
        <Col md={6}>
          <Card.Img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: 400, objectFit: "cover" }}
          />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4 className="text-success">{product.price} €</h4>
          <Button variant="primary" onClick={addToCart}>
            Ajouter au panier 🛒
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
