import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => (
  <Card className="shadow-sm h-100">
    <Card.Img
      variant="top"
      src={product.image || "https://via.placeholder.com/400x250?text=Produit"}
      style={{ height: "220px", objectFit: "cover" }}
    />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>{product.description?.slice(0, 100)}...</Card.Text>
      <Card.Text><strong>{product.price} €</strong></Card.Text>
      <Link to={`/SportHack-Store/produits/${product.id}`} className="btn btn-primary">
        Voir le produit
      </Link>
    </Card.Body>
  </Card>
);
