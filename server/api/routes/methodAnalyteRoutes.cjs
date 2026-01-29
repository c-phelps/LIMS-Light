const express = require("express");
const router = express.Router();
const methodAnalyteController = require("../controllers/methodAnalyteController.cjs");

router.post("/method/:methodId", methodAnalyteController.addAnalyteToMethod);
router.put("/:id", methodAnalyteController.updateMethodAnalyte);
router.delete("/:id", methodAnalyteController.removeAnalyteFromMethod);
router.get("/available/:sampleId", methodAnalyteController.getMethodAnalytesBySample);

module.exports = router;