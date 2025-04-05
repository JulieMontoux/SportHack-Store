require('dotenv').config();

const getAppMode = (req) => {
  return (process.env.VULNERABLE === "true" || req.headers["x-mode"] === "vulnerable" || localStorage.getItem("mode") === "vulnerable");
};

module.exports = getAppMode;
