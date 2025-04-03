import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const ToastAlert = ({ show, setShow, message, variant = "info" }) => (
  <ToastContainer position="top-end" className="p-3">
    <Toast onClose={() => setShow(false)} show={show} bg={variant} delay={3000} autohide>
      <Toast.Body className="text-white">{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);