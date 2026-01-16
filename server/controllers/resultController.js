//crud logic for results
const { Result } = require("../db");

// create result
async function createResult(req, res, next) {
  try {
    const result = await Result.create(req.body, { user: req.user?.username || "system" });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// retrieve specific results for sample
async function getResultsBySample(req, res, next) {
  try {
    const results = await Result.findAll({ where: { sampleId: req.params.sampleId }, include: [Result] });
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
  updateResult,
  deleteResult,
};
