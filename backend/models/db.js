const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données :', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connexion MySQL établie avec succès');
  }
});

module.exports = db;
