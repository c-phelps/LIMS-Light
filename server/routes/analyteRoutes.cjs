const express = require("express");
const router = express.Router();
const analyteController = require("../controllers/analyteController.cjs");

router.post("/", analyteController.createAnalyte);
router.get("/", analyteController.getAnalytes)
router.get("/:id", analyteController.getAnalyteById);
router.put("/:id", analyteController.updateAnalyte);
router.delete("/:id", analyteController.deleteAnalyte);

module.exports = router;