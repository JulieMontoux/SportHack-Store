import React from "react";
import { Card } from "react-bootstrap";

export const CommentCard = ({ comment }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <Card.Title>{comment.user}</Card.Title>
      <Card.Text dangerouslySetInnerHTML={{ __html: comment.content }} />
      <small className="text-muted">Produit ID : {comment.product_id}</small>
    </Card.Body>
  </Card>
);
