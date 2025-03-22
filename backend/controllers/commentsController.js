const db = require("../../test-final/backend/models/db");

exports.getAllComments = (req, res) => {
  const sql = "SELECT * FROM comments ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération commentaires" });
    res.json(results);
  });
};

exports.addComment = (req, res) => {
  const { user, content, product_id } = req.body;
  const sql = "INSERT INTO comments (user, content, product_id) VALUES (?, ?, ?)";
  db.query(sql, [user, content, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur ajout commentaire" });
    res.json({ message: "Commentaire ajouté", id: result.insertId });
  });
};
