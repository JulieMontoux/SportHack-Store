const db = require("./../models/db");

exports.getScore = (req, res) => {
  try {
    const scores = db.prepare(`
      SELECT s.id, u.email AS user, s.label, s.date
      FROM scores s
      JOIN users u ON u.id = s.user_id
      ORDER BY s.date DESC
    `).all();

    res.json({ achievements: scores });
  } catch (err) {
    console.error("❌ Erreur SQL (getScore) :", err.message);
    res.status(500).json({ error: "Erreur récupération scores" });
  }
};

exports.addAchievement = (req, res) => {
  const { user_id, label } = req.body;

  if (!user_id || !label) {
    return res.status(400).json({ error: "user_id et label requis" });
  }

  try {
    const stmt = db.prepare("INSERT INTO scores (user_id, label) VALUES (?, ?)");
    const result = stmt.run(user_id, label);
    res.json({ message: "Succès enregistré", id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Erreur SQL (addAchievement) :", err.message);
    res.status(500).json({ error: "Erreur ajout succès" });
  }
};
