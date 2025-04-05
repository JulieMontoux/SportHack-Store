import React, { useState, useEffect } from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";

const ScorePage = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("score") || "[]");
    setCompleted(local);
  }, []);

  const allChallenges = [
    "SQL Injection (A01)",
    "Broken Authentication (A02)",
    "Sensitive Data Exposure (A03)",
    "Security Misconfiguration (A05)",
    "XSS (A07)",
    "Insecure Design (A04)",
    "Vulnerable Components (A06)",
    "Integrity Failures (A08)",
    "Logging Failures (A09)",
    "SSRF (A10)",
    "Business Logic Bypass (ADV)",
    "Mass Assignment (ADV)",
    "Open Redirect (ADV)",
    "JWT None Signature (ADV)",
    "Rate Limiting Absent (ADV)"
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🎯 Score OWASP - Vulnérabilités découvertes</h2>
      <ListGroup>
        {allChallenges.map((c, i) => (
          <ListGroup.Item key={i} className="d-flex justify-content-between">
            {c}
            {completed.includes(c) ? (
              <Badge bg="success">✅</Badge>
            ) : (
              <Badge bg="secondary">❌</Badge>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ScorePage;