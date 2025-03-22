import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/comments")
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Erreur commentaires :", err));
  }, []);

  return (
    <Container className="mt-4">
      <h2>💬 Avis des utilisateurs</h2>
      {comments.length === 0 ? (
        <p>Aucun commentaire pour le moment.</p>
      ) : (
        comments.map((c) => (
          <Card key={c.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{c.user}</Card.Title>
              <Card.Text dangerouslySetInnerHTML={{ __html: c.content }} />
              <small className="text-muted">Produit ID : {c.product_id}</small>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default CommentsPage;