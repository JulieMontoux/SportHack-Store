const db = require("../../test-final/backend/models/db");
const getAppMode = require("../../test-final/backend/middleware/getAppMode");

exports.getAllProducts = (req, res) => {
  const isVulnerable = getAppMode(req);
  const sql = "SELECT * FROM products";
  console.log(`🔍 Récupération produits - Mode ${isVulnerable ? "VULNÉRABLE" : "SÉCURISÉ"}`);

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur SQL" });
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  const isVulnerable = getAppMode(req);
  const { id } = req.params;

  if (isVulnerable) {
    // ❌ Version vulnérable - injection SQL possible
    const sql = `SELECT * FROM products WHERE id = ${id}`;
    console.log("⚠ SQL (vulnérable) :", sql);
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur SQL" });
      res.json(results[0] || {});
    });
  } else {
    // ✅ Version sécurisée - requête préparée
    const sql = "SELECT * FROM products WHERE id = ?";
    console.log("✅ SQL (sécurisée) :", sql);
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur SQL" });
      res.json(results[0] || {});
    });
  }
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur suppression produit" });
    res.json({ message: "Produit supprimé" });
  });
};

exports.addProduct = (req, res) => {
  const { name, description, price, image } = req.body;
  const sql = "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, description, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur ajout produit" });
    res.json({ message: "Produit ajouté", id: result.insertId });
  });
};
