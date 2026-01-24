const { Analyte } = require("../../db/index.cjs");
// create
async function createAnalyte(req, res, next) {
  try {
    const analyte = await Analyte.create(req.body, { user: req.user?.username || "system" });
    res.status(201).json(analyte);
  } catch (error) {
    next(err);
  }
}

// get all
async function getAnalytes(req, res, next) {
  try {
    const analyte = await Analyte.findAll({ order: [["analyteName", "ASC"]] });    res.json(analyte);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// get by id
async function getAnalyteById(req, res, next) {
  try {
    const analyte = await Analyte.findByPk(req.params.id);
    if (!analyte) return res.status(404).json({ error: "Analyte not found..." });
    res.json(analyte);
  } catch (err) {
    next(err);
  }
}

// update by id
async function updateAnalyte(req, res, next) {
  try {
    const analyte = await Analyte.findByPk(req.params.id);
    if (!analyte) return res.status(404).json({ error: "Analyte not found..." });
    await analyte.update(req.body, { user: req.user?.username || "system" });
    res.json(analyte);
  } catch (err) {
    next(err);
  }
}

// delete by id
async function deleteAnalyte(req, res, next) {
  try {
    const analyte = await Analyte.findByPk(req.params.id);
    if (!analyte) return res.status(404).json({ error: "Analyte not found..." });
    await analyte.destroy({ user: req.user?.username || "system" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createAnalyte,
  getAnalytes,
  getAnalyteById,
  updateAnalyte,
  deleteAnalyte,
};
