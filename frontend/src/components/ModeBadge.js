import React from "react";
import { Badge } from "react-bootstrap";
import { useMode } from "../context/ModeContext";

export const ModeBadge = () => {
  const { mode } = useMode();
  const variant = mode === "vulnerable" ? "danger" : "success";
  const label = mode === "vulnerable" ? "VULNÉRABLE" : "SÉCURISÉ";

  return <Badge bg={variant}>Mode : {label}</Badge>;
};
