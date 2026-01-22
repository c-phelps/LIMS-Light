// routing for samples
const express = require("express");
const router = express.Router();
const sampleController = require("../controllers/sampleController.cjs");

router.post("/", sampleController.createSample);
router.get("/", sampleController.getAllSamples);
router.get("/:id", sampleController.getSampleById);
router.put("/:id", sampleController.updateSample);
router.delete("/:id", sampleController.deleteSample);

module.exports = router;