const db = require("./../models/db");

exports.getAllOrders = (req, res) => {
  try {
    const sql = "SELECT * FROM orders ORDER BY date DESC";
    const orders = db.prepare(sql).all(); // plusieurs résultats
    res.json(orders);
  } catch (err) {
    console.error("❌ Erreur récupération commandes :", err.message);
    res.status(500).json({ error: "Erreur récupération commandes" });
  }
};

exports.getOrdersByUser = (req, res) => {
  const { userId } = req.params;
  try {
    const sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY date DESC";
    const userOrders = db.prepare(sql).all(userId); // filtre par utilisateur
    res.json(userOrders);
  } catch (err) {
    console.error("❌ Erreur récupération commandes utilisateur :", err.message);
    res.status(500).json({ error: "Erreur récupération commandes utilisateur" });
  }
};

exports.addOrder = (req, res) => {
  const { user_id, total, status } = req.body;
  try {
    const sql = "INSERT INTO orders (user_id, date, total, status) VALUES (?, datetime('now'), ?, ?)";
    const stmt = db.prepare(sql);
    const result = stmt.run(user_id, total, status);
    res.json({ message: "Commande enregistrée", id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Erreur ajout commande :", err.message);
    res.status(500).json({ error: "Erreur ajout commande" });
  }
};
