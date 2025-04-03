const db = require("../models/db");
const jwt = require("jsonwebtoken");
const getAppMode = require("../middleware/getAppMode");

exports.login = (req, res) => {
  const { email, password } = req.body;
  const isVulnerable = getAppMode(req);

  console.log("🔍 MODE ACTIF =>", isVulnerable ? "VULNÉRABLE" : "SÉCURISÉ");

  if (isVulnerable) {
    // Vulnérabilité volontaire : pas de vérification du mot de passe
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    console.log('⚠ SQL construite (vulnérable):', sql);

    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ ERREUR SQL :', err);
        return res.status(500).json({ error: 'Erreur SQL' });
      }

      console.log('🔎 Résultats SQL (mode vulnérable) :', results.map(r => ({ id: r.id, email: r.email })));

      if (results.length > 0) {
        const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET);
        return res.json({ token, user: { id: results[0].id, email: results[0].email } });
      } else {
        return res.status(401).json({ error: 'Identifiants incorrects' });
      }
    });
  } else {
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    console.log("✅ SQL préparée (sécurisée):", sql);
    db.query(sql, [email, password], (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur SQL" });
      if (results.length > 0) {
        const token = jwt.sign(
          { userId: results[0].id },
          process.env.JWT_SECRET
        );
        return res.json({ token, user: { id: results[0].id, email: results[0].email } });
      }
      return res.status(401).json({ error: "Identifiants incorrects" });
    });
  }
};