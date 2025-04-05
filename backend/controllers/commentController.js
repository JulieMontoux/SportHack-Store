const db = require("./../models/db");
const getAppMode = require("./../middleware/getAppMode");

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
  const isVulnerable = getAppMode(req);

  let finalContent = content;

  if (!isVulnerable) {
    finalContent = content
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }else {
    // En mode vulnérable, on laisse le contenu tel quel
    finalContent = content; // <-- aucune transformation
  }

  try {
    const stmt = db.prepare("INSERT INTO comments (user, content, product_id) VALUES (?, ?, ?)");
    stmt.run(user, finalContent, product_id);
    res.json({ message: "Commentaire ajouté" });
  } catch (err) {
    console.error("❌ ERREUR ajout commentaire :", err.message);
    res.status(500).json({ error: "Erreur ajout commentaire" });
  }
};
