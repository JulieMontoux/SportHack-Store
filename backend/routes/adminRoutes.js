const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.get("/products", adminController.getAllProducts);

module.exports = router;