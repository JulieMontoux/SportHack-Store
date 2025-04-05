const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbDir = path.resolve(__dirname, './../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'database.db');
const db = new Database(dbPath);

module.exports = db;
