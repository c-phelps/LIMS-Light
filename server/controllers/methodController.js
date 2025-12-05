const { Method } = require("../db");

// create method
async function createMethod(req, res, next) {
  try {
    const method = await Method.create(req.body);
    res.status(201).json(method);
  } catch (err) {
    next(err);
  }
}

// retrieve all methods
async function getMethods(req, res, next) {
  try {
    const method = await Method.findAll({ order: [["matrix", "ASC"]] });
    res.json(method);
  } catch (err) {
    next(err);
  }
}

// retrieve method by matrix
async function getMethodByMatrix(req, res, next) {
  try {
    const method = await Method.findAll({ where: { matrix: req.params.matrix } });
    if (!method) return res.status(404).json({ error: "Method not found" });
    res.json(method);
  } catch (err) {
    next(err);
  }
}

// update method by id
async function updateMethod(req, res, next) {
  try {
    const method = await Method.findByPk(req.params.id);
    if (!method) return res.status(404).json({ error: "Method not found" });

    await method.update(req.body);
    res.json(method);
  } catch (err) {
    next(err);
  }
}

// delete method by id
async function deleteMethod(req, res, next) {
  try {
    const method = await Method.findByPk(req.params.id);
    if (!method) return res.status(404).json({ error: "Method not found" });
    await method.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMethod,
  getMethods,
  updateMethod,
  deleteMethod,
  getMethodByMatrix,
};
