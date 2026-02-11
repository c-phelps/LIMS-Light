// routing logic to tie each endpoint to its controller
const express = require("express");
const router = express.Router();

const sampleRoutes = require("./sampleRoutes.cjs");
const resultRoutes = require("./resultRoutes.cjs");
const methodRoutes = require("./methodRoutes.cjs");
const analyteRoute = require("./analyteRoutes.cjs");
const matrixRoutes = require("./matrixRoutes.cjs");
const userRoutes = require("./userRoutes.cjs");

router.use("/samples", sampleRoutes);
router.use("/results", resultRoutes);
router.use("/methods", methodRoutes);
router.use("/analytes", analyteRoute);
router.use("/matrices", matrixRoutes);
router.use("/method-analytes", userRoutes);
router.use("/users", userRoutes);

module.exports = router;
