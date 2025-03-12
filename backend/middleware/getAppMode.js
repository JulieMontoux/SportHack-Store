require('dotenv').config();

function getAppMode(req) {
  const headerMode = req.headers['x-app-mode'];
  if (headerMode === 'vulnerable') return true;
  if (headerMode === 'secure') return false;
  return process.env.VULNERABLE === 'true';
}

module.exports = getAppMode;
