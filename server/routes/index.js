// routing logic to tie each endpoint to its controller
const express = require("express");
const router = express.Router();

const sampleRoutes = require("./sampleRoutes");
const resultRoutes = require("./resultRoutes");
const methodRoutes = require("./methodRoutes");
const analyteRoute = require("./analyteRoutes");
const matrixRoutes = require("./matrixRoutes");

router.use("/samples", sampleRoutes);
router.use("/results", resultRoutes);
router.use("/methods", methodRoutes);
router.use("/analytes", analyteRoute);
router.use("/matrix", matrixRoutes);

module.exports = router;
