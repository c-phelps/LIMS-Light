//crud logic for results
const { Result, Method, Analyte, Sample, MethodAnalyte } = require("../db/index.cjs");

// create result
async function createResult(req, res, next) {
  try {
    const { sampleId, methodAnalyteId } = req.body;
    // validate sample
    const sample = await Sample.findByPk(sampleId);
    if (!sample) {
      return res.status(404).json({ error: "Sample not found for Result" });
    }

    // enforce method - analyte contract
    const methodAnalyte = await MethodAnalyte.findByPk(methodAnalyteId);
    if (!methodAnalyte) {
      return res.status(400).json({
        error: "Analyte is not valid for the selected method",
      });
    }

    const result = await Result.create(req.body, { user: req.user?.username || "system" });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// retrieve with filters (add more later?)
async function getResultsBySample(req, res, next) {
  try {
    const { sampleId, methodId, analyteId, status } = req.query;

    const where = {};
    if (sampleId) where.sampleId = sampleId;
    if (methodId) where.methodId = methodId;
    if (analyteId) where.analyteId = analyteId;
    if (status) where.status = status;

    const results = await Result.findAll({
      where,
      include: [
        {
          model: MethodAnalyte,
          include: [{ model: Method }, { model: Analyte }],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.json(results);
  } catch (err) {
    next(err);
  }
}

async function getResultsById(req, res, next) {
  try {
    const results = await Result.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: MethodAnalyte,
          include: [{ model: Method }, { model: Analyte }],
        },
      ],
    });
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// retrieve specific results for sample
async function getResultsBySample(req, res, next) {
  try {
    const results = await Result.findAll({ where: { sampleId: req.params.sampleId },
      include: [
        {
          model: MethodAnalyte,
          include: [{ model: Method }, { model: Analyte }],
        },
      ], });
    if (results.length === 0) return res.status(404).json({ error: "No results for this sample" });
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// update result by id
async function updateResult(req, res, next) {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: "Result not found" });
    await result.update(req.body, { user: req.user?.username || "system" });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// delete result by id
async function deleteResult(req, res, next) {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: "Result not found" });
    await result.destroy({ user: req.user?.username || "system" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createResult,
  getResultsBySample,
  getResultsById,
  updateResult,
  deleteResult,
};
