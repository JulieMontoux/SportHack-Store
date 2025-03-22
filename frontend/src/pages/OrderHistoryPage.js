import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Badge } from "react-bootstrap";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erreur chargement commandes :", err));
  }, []);

  return (
    <Container className="mt-4">
      <h2>📦 Historique de vos commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande passée.</p>
      ) : (
        <Table bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.total} €</td>
                <td>
                  <Badge bg={order.status === "Livrée" ? "success" : "warning"}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderHistoryPage;