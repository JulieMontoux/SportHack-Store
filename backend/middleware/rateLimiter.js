const rateLimit = require("express-rate-limit");
const getAppMode = require("./getAppMode");

const rateLimiter = (req, res, next) => {
  const isVulnerable = getAppMode(req);

  if (isVulnerable) return next(); // pas de limitation en mode vulnérable

  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // maximum 5 requêtes/min
    message: "🚫 Trop de requêtes, réessayez plus tard."
  })(req, res, next);
};

module.exports = rateLimiter;
