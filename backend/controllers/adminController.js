const db = require("./../models/db");

exports.getAllUsers = (req, res) => {
  try {
    const stmt = db.prepare("SELECT id, email, role FROM users");
    const results = stmt.all();
    res.json(results);
  } catch (err) {
    console.error("❌ ERREUR SQL (getAllUsers) :", err.message);
    res.status(500).json({ error: "Erreur SQL" });
  }
};

exports.getAllProducts = (req, res) => {
  try {
    const stmt = db.prepare("SELECT id, name, price FROM products");
    const results = stmt.all();
    res.json(results);
  } catch (err) {
    console.error("❌ ERREUR SQL (getAllProducts) :", err.message);
    res.status(500).json({ error: "Erreur SQL" });
  }
};
