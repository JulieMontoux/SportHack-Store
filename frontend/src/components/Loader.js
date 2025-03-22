import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => (
  <div className="text-center my-5">
    <Spinner animation="border" variant="primary" />
    <p className="mt-2">Chargement en cours...</p>
  </div>
);