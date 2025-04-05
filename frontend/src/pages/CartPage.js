import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const updateCart = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems(items);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
    setMessage("Produit retiré du panier.");
  };

  const changeQty = (id, delta) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <Container className="mt-4">
      <h2>🛒 Mon Panier</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <Table striped bordered hover className="mt-3 text-center">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Sous-total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} €</td>
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => changeQty(item.id, -1)}
                    >
                      −
                    </Button>{" "}
                    <strong>{item.qty}</strong>{" "}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => changeQty(item.id, 1)}
                    >
                      +
                    </Button>
                  </td>
                  <td>{(item.price * item.qty).toFixed(2)} €</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total : {total.toFixed(2)} €</h4>
        </>
      )}
    </Container>
  );
};

export default CartPage;
