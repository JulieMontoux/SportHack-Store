import React, { useState, useEffect } from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";
import { checkCompletedChallenges } from "./../utils/scoreChecker";

const ScorePage = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    // 1️⃣ Récupérer les succès déjà enregistrés
    fetch(`https://sporthack-store.onrender.com/api/scores?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const existingLabels = data.achievements.map((a) => a.label);

        // 2️⃣ Vérifier les succès détectés localement
        const detected = checkCompletedChallenges();
        const newLabels = detected.filter((d) => !existingLabels.includes(d));

        newLabels.forEach((label) => {
          fetch(`https://sporthack-store.onrender.com/api/scores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id, label }),
          });
        });

        // 4️⃣ Rafraîchir la liste complète à afficher
        setCompleted([...existingLabels, ...newLabels]);
      })
      .catch((err) => console.error("Erreur récupération scores :", err));
  }, []);

  const allChallenges = {
    "SQL Injection (A01)": "/SportHack-Store/docs/vulnerabilities/1_sql-injection.md",
    "Broken Authentication (A02)": "/SportHack-Store/docs/vulnerabilities/2_broken-authentication.md",
    "Sensitive Data Exposure (A03)": "/SportHack-Store/docs/vulnerabilities/3_sensitive-data-exposure.md",
    "Security Misconfiguration (A05)": "/SportHack-Store/docs/vulnerabilities/4_security-misconfiguration.md",
    "XSS (A07)": "/SportHack-Store/docs/vulnerabilities/5_xss.md",
    "Insecure Design (A04)": "/SportHack-Store/docs/vulnerabilities/insecure-deserialization.md",
    "Vulnerable Components (A06)": "/SportHack-Store/docs/vulnerabilities/vulnerable_components.md",
    "Integrity Failures (A08)": "/SportHack-Store/docs/vulnerabilities/integrity_failures.md",
    "Logging Failures (A09)": "/SportHack-Store/docs/vulnerabilities/logging_failures.md",
    "SSRF (A10)": "/SportHack-Store/docs/vulnerabilities/ssrf.md",
    "Business Logic Bypass (ADV)": "/SportHack-Store/docs/vulnerabilities/6_business-logic-bypass.md",
    "Mass Assignment (ADV)": "/SportHack-Store/docs/vulnerabilities/7_mass-assignment.md",
    "Open Redirect (ADV)": "/SportHack-Store/docs/vulnerabilities/8_open-redirect.md",
    "JWT None Signature (ADV)": "/SportHack-Store/docs/vulnerabilities/9_jwt-signature-bypass.md",
    "Rate Limiting Absent (ADV)": "/SportHack-Store/docs/vulnerabilities/10_rate-limiting.md"
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🎯 Score OWASP - Vulnérabilités découvertes</h2>
      <ListGroup>
        {Object.entries(allChallenges).map(([label, link], i) => (
          <ListGroup.Item
            key={i}
            className="d-flex justify-content-between align-items-center"
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {label}
            </a>
            {completed.includes(label) ? (
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
