require("dotenv").config();
const express = require("express");
const cors = require("cors");
const getAppMode = require("./middleware/getAppMode");
const rateLimiter = require("./middleware/rateLimitMiddleware"); // ✅ Ajout ici

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔍 Log du mode actif
app.use((req, res, next) => {
  const mode = getAppMode(req) ? "VULNÉRABLE" : "SÉCURISÉ";
  console.log(`🔍 MODE ACTIF => ${mode}`);
  next();
});

// ✅ Appliquer rate limiter sur /api/auth/login UNIQUEMENT
app.use("/api/auth/login", rateLimiter);

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const commentRoutes = require("./routes/comments");
const scoreRoutes = require("./routes/score");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/auth", authRoutes); // 👈 /login est déjà limité au-dessus
app.use("/api/login", adminRoutes);

app.get("/api", (req, res) => {
  res.send("🎯 API SportH@ck Store opérationnelle !");
});

app.get('/api/healthcheck', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`✅ Backend API lancée sur le port ${PORT}`);
});
