import React, { useState, useEffect } from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";

const allChallenges = [
  {
    label: "SQL Injection (A01)",
    key: "sql_succeed",
    link: "/SportHack-Store/docs/vulnerabilities/1_sql-injection.md",
  },
  {
    label: "Broken Authentication (A02)",
    condition: (user) => user?.email?.includes("@"),
    link: "/SportHack-Store/docs/vulnerabilities/2_broken-authentication.md",
  },
  {
    label: "Sensitive Data Exposure (A03)",
    condition: (user) => !!user?.email,
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
    label: "XSS (A07)",
    key: "xss_triggered",
    link: "/SportHack-Store/docs/vulnerabilities/5_xss.md",
  },
  {
    label: "Vulnerable Components (A06)",
    key: "vulnerable_components_loaded",
    link: "/SportHack-Store/docs/vulnerabilities/vulnerable_components.md",
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
    condition: (_, __, cart) => cart.length > 0,
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
    condition: (_, token) => !!token,
    link: "/SportHack-Store/docs/vulnerabilities/9_jwt-signature-bypass.md",
  },
  {
    label: "Rate Limiting Absent (ADV)",
    key: "rate_limiting_absent",
    link: "/SportHack-Store/docs/vulnerabilities/10_rate-limiting.md",
  },
];

const ScorePage = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!user) return;
  
    fetch(`https://sporthack-store.onrender.com/api/scores?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const alreadyDone = data.achievements.map((a) => a.label);
        const detected = [];
  
        for (const challenge of allChallenges) {
          const alreadySent = alreadyDone.includes(challenge.label);
          const triggered =
            (challenge.key && localStorage.getItem(challenge.key)) ||
            (challenge.condition && challenge.condition(user, token, cart));
  
          if (triggered && !alreadySent) {
            const last = localStorage.getItem("_last_vuln_sent");
            if (last !== challenge.label) {
              detected.push(challenge.label);
              localStorage.setItem("_last_vuln_sent", challenge.label);
  
              // ✅ Marquer comme validé en localStorage
              if (challenge.key) {
                localStorage.setItem(challenge.key, "true");
              }
            }
            break;
          }
        }
  
        detected.forEach((label) => {
          fetch(`https://sporthack-store.onrender.com/api/scores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id, label }),
          });
        });
  
        setCompleted([...alreadyDone, ...detected]);
      })
      .catch((err) => console.error("❌ Erreur récupération scores :", err));
  }, []);  

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🎯 Score OWASP - Vulnérabilités découvertes</h2>
      <ListGroup>
        {allChallenges.map(({ label, link }, i) => (
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
