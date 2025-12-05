// routing logic to tie each endpoint to its controller

const express = require ("express");
const router = express.Router();

const sampleRoutes = require("./sampleRoutes");
const resultRoutes = require("./resultRoutes");
const methodRoutes = require("./methodRoutes");

router.use('/samples', sampleRoutes);
router.use('/results', resultRoutes);
router.use('/methods', methodRoutes);

module.exports = router;