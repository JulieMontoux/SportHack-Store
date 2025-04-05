export const checkCompletedChallenges = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const checks = [
    { label: "SQL Injection (A01)", key: "sql_succeed" },
    { label: "Broken Authentication (A02)", condition: () => user?.email?.includes("@") },
    { label: "Sensitive Data Exposure (A03)", condition: () => !!user?.email },
    { label: "Insecure Design (A04)", key: "insecure_design" },
    { label: "Security Misconfiguration (A05)", key: "security_misconfig" },
    { label: "Vulnerable Components (A06)", key: "vulnerable_components_loaded" },
    { label: "XSS (A07)", key: "xss_triggered" },
    { label: "Integrity Failures (A08)", key: "integrity_failures" },
    { label: "Logging Failures (A09)", key: "logging_failure" },
    { label: "SSRF (A10)", key: "ssrf_attempt" },
    { label: "Business Logic Bypass (ADV)", condition: () => cart.length > 0 },
    { label: "Mass Assignment (ADV)", key: "mass_assignment" },
    { label: "Open Redirect (ADV)", key: "open_redirect" },
    { label: "JWT None Signature (ADV)", condition: () => !!token },
    { label: "Rate Limiting Absent (ADV)", key: "rate_limiting_absent" }
  ];

  for (const c of checks) {
    if (c.key && localStorage.getItem(c.key)) return [c.label];
    if (c.condition && c.condition()) return [c.label];
  }

  return [];
};
