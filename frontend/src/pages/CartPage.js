import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
    setMessage("Produit retiré du panier.");
  };

  return (
    <Container className="mt-4">
      <h2>🛒 Mon Panier</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price} €</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CartPage;