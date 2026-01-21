//crud logic for samples
const { Sample, Result } = require("../db");

// create sample
async function createSample(req, res, next) {
  try {
    const sample = await Sample.create(req.body, { user: req.user?.username || "system" });
    res.status(201).json(sample);
  } catch (err) {
    next(err);
  }
}

//retrieve all samples
async function getAllSamples(req, res, next) {
  try {
    const samples = await Sample.findAll({ order: [["createdAt", "DESC"]], limit: 200 });
    res.json(samples);
  } catch (err) {
    next(err);
  }
}

//retrieve specific sample
async function getSampleById(req, res, next) {
  try {
    const sample = await Sample.findByPk(req.params.id, { include: [Result] });
    if (!sample) return res.status(404).json({ error: "Sample not found" });
    res.json(sample);
  } catch (err) {
    next(err);
  }
}

//update sample by id
async function updateSample(req, res, next) {
  try {
    const sample = await Sample.findByPk(req.params.id);
    if (!sample) return res.status(404).json({ error: "Sample not found" });

    await sample.update(req.body, { user: req.user?.username || "system" });

    res.json(sample);
  } catch (err) {
    next(err);
  }
}

//delete sample by id
async function deleteSample(req, res, next) {
  try {
    const sample = await Sample.findByPk(req.params.id);
    if (!sample) return res.status(404).json({ error: "Sample not found" });

    await sample.destroy({ user: req.user?.username || "system" });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
};
