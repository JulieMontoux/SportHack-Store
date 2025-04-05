export const checkCompletedChallenges = () => {
    const done = [];
  
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    // 🔐 Broken Auth = email détecté
    if (user?.email?.includes("@")) done.push("Broken Authentication (A02)");
  
    // 🔑 JWT sans signature (exploité)
    if (token) done.push("JWT None Signature (ADV)");
  
    // 🛒 Bypass logique business (ex : ajout produit sans connexion)
    if (cart.length > 0) done.push("Business Logic Bypass (ADV)");
  
    // 🐛 SQLi
    if (localStorage.getItem("sql_succeed")) done.push("SQL Injection (A01)");
  
    // 🐞 XSS déclenchée
    if (localStorage.getItem("xss_triggered")) done.push("XSS (A07)");
  
    // 🔀 Redirection non sécurisée
    if (localStorage.getItem("open_redirect")) done.push("Open Redirect (ADV)");
  
    // 🔐 Exposition données sensibles (email visible dans le profil ?)
    if (user?.email) done.push("Sensitive Data Exposure (A03)");
  
    // 🔧 Mauvaise config détectée
    if (localStorage.getItem("security_misconfig")) done.push("Security Misconfiguration (A05)");
  
    // ⚠️ Composants vulnérables appelés
    if (localStorage.getItem("vulnerable_components_loaded")) done.push("Vulnerable Components (A06)");
  
    // 🔓 Conception non sécurisée : form non protégé, pas de validation
    if (localStorage.getItem("insecure_design")) done.push("Insecure Design (A04)");
  
    // 📉 Intégrité compromise (ex : modification client-side de prix)
    if (localStorage.getItem("integrity_failures")) done.push("Integrity Failures (A08)");
  
    // 🕵️ Logs manquants
    if (localStorage.getItem("logging_failure")) done.push("Logging Failures (A09)");
  
    // 🌐 SSRF (simulé avec une requête backend faite à une URL tierce)
    if (localStorage.getItem("ssrf_attempt")) done.push("SSRF (A10)");
  
    // 🧾 Assignation massive
    if (localStorage.getItem("mass_assignment")) done.push("Mass Assignment (ADV)");
  
    // 🚦 Absence de rate limiting détectée
    if (localStorage.getItem("rate_limiting_absent")) done.push("Rate Limiting Absent (ADV)");
  
    return done;
  };
  