const express = require("express");
const router = express.Router();
const methodAnalyteController = require("../controllers/methodAnalyteController");

router.post("/", methodAnalyteController.createMethodAnalyte);
router.put("/:id", methodAnalyteController.updateMethodAnalyte);
router.delete("/:id", methodAnalyteController.deleteMethodAnalyte);

module.exports = router;