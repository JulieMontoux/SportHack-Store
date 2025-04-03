import React from "react";
import { Badge } from "react-bootstrap";

export const ModeBadge = () => {
  const mode = localStorage.getItem("mode") === "vulnerable" ? "danger" : "success";
  const label = mode === "danger" ? "VULNÉRABLE" : "SÉCURISÉ";
  return <Badge bg={mode}>Mode : {label}</Badge>;
};