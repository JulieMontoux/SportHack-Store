import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api//products").then((res) => setProducts(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/products/${id}`).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  return (
    <Container className="mt-4">
      <h2>🛠️ Gestion des Produits</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} €</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProductsPage;