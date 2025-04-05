export const checkCompletedChallenges = () => {
    const done = [];
  
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    if (localStorage.getItem("sql_succeed")) return ["SQL Injection (A01)"];
    if (user?.email?.includes("@")) return ["Broken Authentication (A02)"];
    if (user?.email) return ["Sensitive Data Exposure (A03)"];
    if (localStorage.getItem("insecure_design")) return ["Insecure Design (A04)"];
    if (localStorage.getItem("security_misconfig")) return ["Security Misconfiguration (A05)"];
    if (localStorage.getItem("vulnerable_components_loaded")) return ["Vulnerable Components (A06)"];
    if (localStorage.getItem("xss_triggered")) return ["XSS (A07)"];
    if (localStorage.getItem("integrity_failures")) return ["Integrity Failures (A08)"];
    if (localStorage.getItem("logging_failure")) return ["Logging Failures (A09)"];
    if (localStorage.getItem("ssrf_attempt")) return ["SSRF (A10)"];
    if (cart.length > 0) return ["Business Logic Bypass (ADV)"];
    if (localStorage.getItem("mass_assignment")) return ["Mass Assignment (ADV)"];
    if (localStorage.getItem("open_redirect")) return ["Open Redirect (ADV)"];
    if (token) return ["JWT None Signature (ADV)"];
    if (localStorage.getItem("rate_limiting_absent")) return ["Rate Limiting Absent (ADV)"];
  
    return done;
  };
  