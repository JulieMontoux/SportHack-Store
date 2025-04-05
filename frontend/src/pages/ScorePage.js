import React, { useState, useEffect } from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";

const ScorePage = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!user) return;

    // 📌 Challenge unique avec label, clé de validation ou condition, et lien doc
    const allChallenges = [
      {
        label: "SQL Injection (A01)",
        key: "sql_succeed",
        link: "/SportHack-Store/docs/vulnerabilities/1_sql-injection.md",
      },
      {
        label: "Broken Authentication (A02)",
        condition: () => user?.email?.includes("@"),
        link: "/SportHack-Store/docs/vulnerabilities/2_broken-authentication.md",
      },
      {
        label: "Sensitive Data Exposure (A03)",
        condition: () => !!user?.email,
        link: "/SportHack-Store/docs/vulnerabilities/3_sensitive-data-exposure.md",
      },
      {
        label: "Insecure Design (A04)",
        key: "insecure_design",
        link: "/SportHack-Store/docs/vulnerabilities/insecure-deserialization.md",
      },
      {
        label: "Security Misconfiguration (A05)",
        key: "security_misconfig",
        link: "/SportHack-Store/docs/vulnerabilities/4_security-misconfiguration.md",
      },
      {
        label: "Vulnerable Components (A06)",
        key: "vulnerable_components_loaded",
        link: "/SportHack-Store/docs/vulnerabilities/vulnerable_components.md",
      },
      {
        label: "XSS (A07)",
        key: "xss_triggered",
        link: "/SportHack-Store/docs/vulnerabilities/5_xss.md",
      },
      {
        label: "Integrity Failures (A08)",
        key: "integrity_failures",
        link: "/SportHack-Store/docs/vulnerabilities/integrity_failures.md",
      },
      {
        label: "Logging Failures (A09)",
        key: "logging_failure",
        link: "/SportHack-Store/docs/vulnerabilities/logging_failures.md",
      },
      {
        label: "SSRF (A10)",
        key: "ssrf_attempt",
        link: "/SportHack-Store/docs/vulnerabilities/ssrf.md",
      },
      {
        label: "Business Logic Bypass (ADV)",
        condition: () => cart.length > 0,
        link: "/SportHack-Store/docs/vulnerabilities/6_business-logic-bypass.md",
      },
      {
        label: "Mass Assignment (ADV)",
        key: "mass_assignment",
        link: "/SportHack-Store/docs/vulnerabilities/7_mass-assignment.md",
      },
      {
        label: "Open Redirect (ADV)",
        key: "open_redirect",
        link: "/SportHack-Store/docs/vulnerabilities/8_open-redirect.md",
      },
      {
        label: "JWT None Signature (ADV)",
        condition: () => !!token,
        link: "/SportHack-Store/docs/vulnerabilities/9_jwt-signature-bypass.md",
      },
      {
        label: "Rate Limiting Absent (ADV)",
        key: "rate_limiting_absent",
        link: "/SportHack-Store/docs/vulnerabilities/10_rate-limiting.md",
      },
    ];

    // 🧠 Historique local
    const localValidations = JSON.parse(
      localStorage.getItem("validated_challenges") || "[]"
    );

    // 1️⃣ On vérifie les validations déclenchées côté navigateur
    const newlyDetected = allChallenges
      .filter((c) => {
        const triggered = c.key ? localStorage.getItem(c.key) : c.condition?.();
        return triggered && !localValidations.includes(c.label);
      })
      .map((c) => c.label);

    // 2️⃣ On envoie uniquement les nouveaux labels à l'API
    newlyDetected.forEach((label) => {
      fetch(`https://sporthack-store.onrender.com/api/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, label }),
      });
    });

    // 3️⃣ On met à jour le localStorage pour conserver les validations
    const updatedValidations = Array.from(
      new Set([...localValidations, ...newlyDetected])
    );
    localStorage.setItem(
      "validated_challenges",
      JSON.stringify(updatedValidations)
    );

    // 4️⃣ Mise à jour affichage
    setCompleted(updatedValidations);
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🎯 Score OWASP - Vulnérabilités découvertes</h2>
      <ListGroup>
        {allChallenges.map(({ label, link }) => (
          <ListGroup.Item
            key={label}
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
