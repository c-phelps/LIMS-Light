const express = require("express");
const router = express.Router();
const methodAnalyteController = require("../controllers/methodAnalyteController.cjs");

router.post("/", methodAnalyteController.addAnalyteToMethod);

router.put("/:id", methodAnalyteController.updateMethodAnalyte);
router.delete("/:id", methodAnalyteController.removeAnalyteFromMethod);

module.exports = router;