const { Matrix, Method } = require("../../db/index.cjs");

// create
async function createMatrix(req, res, next) {
  try {
    const matrix = await Matrix.create(req.body);
    res.status(201).json(matrix, { user: req.user?.username || "system" });
  } catch (err) {
    next(err);
  }
}

// get all
async function getMatrix(req, res, next) {
  try {
    const matrix = await Matrix.findAll({ order: [["matrixName", "ASC"]] });
    res.json(matrix);
  } catch (err) {
    next(err);
  }
}

// get by id
async function getMatrixById(req, res, next) {
  try {
    const matrix = await Matrix.findByPk(res.params.id, { include: [Method] });
    if (!matrix) return res.status(404).json({ error: "Matrix not found..." });

    res.json(matrix);
  } catch (err) {
    next(err);
  }
}

// update by id
async function updateMatrix(req, res, next) {
  try {
    const matrix = await Matrix.findByPk(req.params.id);
    if (!matrix) return res.status(404).json({ error: "Matrix not found..." });

    await matrix.update(req.body, { user: req.user?.username || "system" });
    res.json(matrix);
  } catch (err) {
    next(err);
  }
}

// delete by id
async function deleteMatrix(req, res, next) {
  try {
    const matrix = await Matrix.findByPk(req.params.id);
    if (!matrix) return res.status(404).json({ error: "Matrix not found..." });
    await matrix.destroy({ user: req.user?.username || "system" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMatrix,
  getMatrix,
  getMatrixById,
  updateMatrix,
  deleteMatrix,
};
