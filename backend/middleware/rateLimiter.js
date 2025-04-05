const rateLimit = require("express-rate-limit");
const getAppMode = require("./getAppMode");

const rateLimiter = (req, res, next) => {
    console.log("🧱 Middleware rateLimiter appelé !");
    const isVulnerable = getAppMode(req);
  
    if (isVulnerable) {
      console.log("🔓 Pas de rate limit en mode vulnérable");
      return next();
    }
  
    return rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 5,
      message: (req, res) => {
        console.log("🚫 Blocage rate limiting !");
        return "🚫 Trop de requêtes, réessayez plus tard.";
      }
    })(req, res, next);
  };  
      
module.exports = rateLimiter;
