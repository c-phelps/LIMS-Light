const express = require("express");
const router = express.Router();
const methodController = require("../controllers/methodController");

router.post("/", methodController.createMethod);
router.get("/", methodController.getMethods);
router.get("/:id", methodController.getMethodById);
router.put("/:id", methodController.updateMethod);
router.delete("/:id", methodController.deleteMethod);

module.exports = router;