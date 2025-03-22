const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

router.get("/", scoreController.getScore);
router.post("/", scoreController.addAchievement);

module.exports = router;
