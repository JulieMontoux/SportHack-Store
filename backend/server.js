require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const getAppMode = require("./middleware/getAppMode");
app.use((req, res, next) => {
  const mode = getAppMode(req) ? "VULNÉRABLE" : "SÉCURISÉ";
  console.log(`🔍 MODE ACTIF => ${mode}`);
  next();
});

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const commentRoutes = require("./routes/comments");
const scoreRoutes = require("./routes/score");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("https://sporthack-store.onrender.com/api/products", productRoutes);
app.use("https://sporthack-store.onrender.com/api/orders", orderRoutes);
app.use("https://sporthack-store.onrender.com/api/comments", commentRoutes);
app.use("https://sporthack-store.onrender.com/api/scores", scoreRoutes);
app.use("https://sporthack-store.onrender.com/api/auth", authRoutes);
app.use("https://sporthack-store.onrender.com/api/login", adminRoutes);

app.get("https://sporthack-store.onrender.com/api", (req, res) => {
  res.send("🎯 API SportH@ck Store opérationnelle !");
});

app.get('https://sporthack-store.onrender.com/api/healthcheck', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`✅ Backend API lancée sur le port ${PORT}`);
});
