const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController.cjs");

router.post("/", resultController.createResult);
router.get("/:id", resultController.getResultsById);
router.get("/sample/:sampleId", resultController.getResultsBySample);
router.put("/:id", resultController.updateResult);
router.delete("/:id", resultController.deleteResult);
router.post("/:id/approve", resultController.approveResult);
router.post("/:id/reject", resultController.rejectResult);
router.post("/:id/submit", resultController.submitResult);


module.exports = router;
