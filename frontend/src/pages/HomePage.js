import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => setFeaturedProducts(res.data.slice(0, 3)))
      .catch((err) => console.error("Erreur chargement produits :", err));
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">🏋️‍♂️ Bienvenue sur SportH@ck Store</h1>
      <p className="text-center mb-5">
        Découvrez notre sélection d'articles de sport, testez la sécurité applicative
        et explorez nos défis OWASP dans une interface e-commerce immersive.
      </p>

      <Carousel className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
            alt="Promo équipement"
          />
          <Carousel.Caption className="text-dark">
            <h3>Équipez-vous pour vos performances</h3>
            <p>Profitez des offres exclusives sur les produits en vedette</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Défis sécurité OWASP"
          />
          <Carousel.Caption>
            <h3>Apprenez en vous amusant !</h3>
            <p>Déjouez les failles de sécurité intégrées dans notre boutique pédagogique</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="mb-4">⭐ Produits en vedette</h2>
      <Row>
        {featuredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description?.slice(0, 80)}...</Card.Text>
                <Card.Text>
                  <strong>{product.price} €</strong>
                </Card.Text>
                <Link to={`/produits/${product.id}`} className="btn btn-primary">
                  Voir le produit
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
