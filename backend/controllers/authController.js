const db = require("./../models/db");
const jwt = require("jsonwebtoken");
const getAppMode = require("./../middleware/getAppMode");

exports.login = (req, res) => {
  const { email, password } = req.body;
  const isVulnerable = getAppMode(req);

  console.log("🔍 MODE ACTIF =>", isVulnerable ? "VULNÉRABLE" : "SÉCURISÉ");

  try {
    let user;

    if (isVulnerable) {
      // ⚠ Vulnérabilité volontaire : injection SQL possible
      const sql = `SELECT * FROM users WHERE email = '${email}'`;
      console.log("⚠ SQL construite (vulnérable):", sql);

      user = db.prepare(sql).get(); // get() = un seul résultat
    } else {
      const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
      console.log("✅ SQL préparée (sécurisée):", sql);

      user = db.prepare(sql).get(email, password);
    }

    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    
      const triggered = isVulnerable ? "sql_succeed" : null;
    
      return res.json({ 
        token, 
        user: { id: user.id, email: user.email, role: user.role },
        triggered 
      });
    }
    
  } catch (err) {
    console.error("❌ ERREUR SQL (login):", err.message);
    return res.status(500).json({ error: "Erreur SQL" });
  }
};
