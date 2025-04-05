const db = require("./../models/db");
const getAppMode = require("./../middleware/getAppMode");

exports.getAllProducts = (req, res) => {
  const isVulnerable = getAppMode(req);
  const sql = "SELECT * FROM products";
  console.log(`🔍 Récupération produits - Mode ${isVulnerable ? "VULNÉRABLE" : "SÉCURISÉ"}`);

  try {
    const products = db.prepare(sql).all(); // exécution directe
    res.json(products);
  } catch (err) {
    console.error("❌ Erreur SQL (getAllProducts) :", err.message);
    res.status(500).json({ error: "Erreur SQL" });
  }
};

exports.getProductById = (req, res) => {
  const isVulnerable = getAppMode(req);
  const { id } = req.params;

  try {
    let product;

    if (isVulnerable) {
      const sql = `SELECT * FROM products WHERE id = ${id}`; // injection possible ici
      console.log("⚠ SQL (vulnérable) :", sql);
      product = db.prepare(sql).get(); // .get() pour un seul résultat
    } else {
      const sql = "SELECT * FROM products WHERE id = ?";
      console.log("✅ SQL (sécurisée) :", sql);
      product = db.prepare(sql).get(id);
    }

    res.json(product || {});
  } catch (err) {
    console.error("❌ Erreur SQL (getProductById) :", err.message);
    res.status(500).json({ error: "Erreur SQL" });
  }
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);
    res.json({ message: "Produit supprimé", changes: result.changes });
  } catch (err) {
    console.error("❌ Erreur suppression produit :", err.message);
    res.status(500).json({ error: "Erreur suppression produit" });
  }
};

exports.addProduct = (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const stmt = db.prepare("INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)");
    const result = stmt.run(name, description, price, image);
    res.json({ message: "Produit ajouté", id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Erreur ajout produit :", err.message);
    res.status(500).json({ error: "Erreur ajout produit" });
  }
};
