import React from "react";
import { Badge } from "react-bootstrap";

export const UserBadge = ({ role }) => {
  const color = role === "admin" ? "danger" : "secondary";
  return <Badge bg={color}>{role.toUpperCase()}</Badge>;
};
