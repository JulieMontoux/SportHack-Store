const db = require('../models/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (process.env.VULNERABLE === 'true') {
    // ⚠️ VERSION VULNÉRABLE : SQL Injection possible
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Identifiants incorrects' });
      }
    });
  } else {
    // ✅ VERSION SÉCURISÉE : requêtes préparées
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Identifiants incorrects' });
      }
    });
  }
};
