const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // Limite à 5 tentatives par minute
  message: {
    error: "🚫 Trop de tentatives, réessayez plus tard.",
  },
});

module.exports = loginLimiter;
