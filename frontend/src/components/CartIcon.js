import React from "react";
import { Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

export const CartIcon = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return (
    <div>
      <FaShoppingCart size={20} />
      <Badge pill bg="warning" className="ms-1">
        {cart.length}
      </Badge>
    </div>
  );
};