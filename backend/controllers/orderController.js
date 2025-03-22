const db = require("../models/db");

exports.getAllOrders = (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération commandes" });
    res.json(results);
  });
};

exports.getOrdersByUser = (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY date DESC";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération commandes utilisateur" });
    res.json(results);
  });
};

exports.addOrder = (req, res) => {
  const { user_id, total, status } = req.body;
  const sql = "INSERT INTO orders (user_id, date, total, status) VALUES (?, NOW(), ?, ?)";
  db.query(sql, [user_id, total, status], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur ajout commande" });
    res.json({ message: "Commande enregistrée", id: result.insertId });
  });
};
