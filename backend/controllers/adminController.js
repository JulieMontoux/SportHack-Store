const db = require("../models/db");

exports.getAllUsers = (req, res) => {
  const sql = "SELECT id, email, role FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ ERREUR SQL (getAllUsers) :", err);
      return res.status(500).json({ error: "Erreur SQL" });
    }
    res.json(results);
  });
};

exports.getAllProducts = (req, res) => {
  const sql = "SELECT id, name, price FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ ERREUR SQL (getAllProducts) :", err);
      return res.status(500).json({ error: "Erreur SQL" });
    }
    res.json(results);
  });
};
