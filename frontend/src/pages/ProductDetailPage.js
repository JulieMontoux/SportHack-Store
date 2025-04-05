import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
} from "react-bootstrap";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://sporthack-store.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Erreur produit :", err));

    axios
      .get(`https://sporthack-store.onrender.com/api/comments`)
      .then((res) =>
        setComments(res.data.filter((c) => c.product_id === Number(id)))
      )
      .catch((err) => console.error("Erreur commentaires :", err));
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

  const submitComment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Connectez-vous pour commenter");

    try {
      await axios.post("https://sporthack-store.onrender.com/api/comments", {
        user: user.email,
        content: comment,
        product_id: id,
      });
      setComment("");
      localStorage.setItem("xss_triggered", true); // pour validation score
      window.location.reload(); // recharge pour voir l’effet XSS
    } catch (err) {
      console.error("Erreur ajout commentaire :", err);
    }
  };

  if (!product)
    return <p className="text-center mt-5">Chargement du produit...</p>;

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

      <hr />

      <h4 className="mt-4">💬 Commentaires</h4>
      {comments.length === 0 ? (
        <p>Aucun commentaire pour ce produit.</p>
      ) : (
        <div className="mb-3">
          {comments.map((c, i) => {
            console.log("🧪 Contenu reçu :", c.content);
            return (
              <div key={i}>
                <strong>{c.user}</strong> :{" "}
                <span dangerouslySetInnerHTML={{ __html: c.content }} />
              </div>
            );
          })}
        </div>
      )}

      <Form className="mt-4">
        <Form.Group>
          <Form.Label>Laisser un commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ex : Super produit ou test XSS"
          />
        </Form.Group>
        <Button className="mt-2" variant="success" onClick={submitComment}>
          Envoyer
        </Button>
      </Form>
    </Container>
  );
};

export default ProductDetailPage;
