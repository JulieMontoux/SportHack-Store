require('dotenv').config();

const getAppMode = (req) => {
  return process.env.VULNERABLE === "true" || req.headers["x-app-mode"] === "vulnerable";
};

module.exports = getAppMode;
