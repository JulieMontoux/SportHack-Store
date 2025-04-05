const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');

const getAppMode = require("./../middleware/getAppMode");
const loginLimiter = require("./../middleware/rateLimiter");

router.post("/login", (req, res, next) => {
    const isVulnerable = getAppMode(req);
    if (!isVulnerable) {
      return loginLimiter(req, res, next); // ⛔ sécurise seulement en mode sécurisé
    }
    next();
  }, authController.login);
  
  module.exports = router;

module.exports = router;
