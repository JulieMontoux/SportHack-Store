import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Badge, Button } from "react-bootstrap";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>📋 Suivi des Commandes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.user}</td>
              <td>{new Date(o.date).toLocaleDateString()}</td>
              <td>{o.total} €</td>
              <td>
                <Badge bg={o.status === "Livrée" ? "success" : "warning"}>{o.status}</Badge>
              </td>
              <td>
                <Button variant="outline-info" size="sm">Détails</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrdersPage;
