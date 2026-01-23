const express = require("express");
const router = express.Router();
const matrixController = require("../controllers/matrixController.cjs");

router.post("/", matrixController.createMatrix);
router.get("/", matrixController.getMatrix)
router.get("/:id", matrixController.getMatrixById);
router.put("/:id", matrixController.updateMatrix);
router.delete("/:id", matrixController.deleteMatrix);

module.exports = router;