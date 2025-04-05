const db = require("./../models/db");

exports.getAllComments = (req, res) => {
  try {
    const sql = "SELECT * FROM comments ORDER BY id DESC";
    const comments = db.prepare(sql).all(); // .all() pour plusieurs résultats
    res.json(comments);
  } catch (err) {
    console.error("❌ Erreur récupération commentaires :", err.message);
    res.status(500).json({ error: "Erreur récupération commentaires" });
  }
};

exports.addComment = (req, res) => {
  const { user, content, product_id } = req.body;
  try {
    const sql = "INSERT INTO comments (user, content, product_id) VALUES (?, ?, ?)";
    const stmt = db.prepare(sql);
    const result = stmt.run(user, content, product_id); // .run() pour les INSERT
    res.json({ message: "Commentaire ajouté", id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Erreur ajout commentaire :", err.message);
    res.status(500).json({ error: "Erreur ajout commentaire" });
  }
};
