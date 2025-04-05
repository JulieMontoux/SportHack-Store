import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://sporthack-store.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setMessage("❌ Produit introuvable."));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage("✅ Produit ajouté au panier.");
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Prix :</strong> {product.price} €</p>
      <button className="btn btn-primary" onClick={handleAddToCart}>Ajouter au panier</button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ProductPage;
