const { Method, MethodAnalyte, Analyte } = require("../../db/index.cjs");

// create method
async function createMethod(req, res, next) {
  try {
    const method = await Method.create(req.body, { user: req.user?.username || "system" });
    res.status(201).json(method);
  } catch (err) {
    next(err);
  }
}

// retrieve all methods
async function getMethods(req, res, next) {
  try {
    const method = await Method.findAll({
      order: [["methodName", "ASC"]],
      include: [Matrix, { model: MethodAnalyte, include: [Analyte], order: [["reportingOrder", "ASC"]] }],
    });
    res.json(method);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
// retrieve method by matrix
async function getMethodById(req, res, next) {
  try {
    const method = await Method.findByPk(req.params.id, {
      include: [Matrix, { model: MethodAnalyte, include: [Analyte] }],
    });
    if (!method) return res.status(404).json({ error: "Method not found" });
    res.json(method);
  } catch (err) {
    next(err);
  }
}

// get analytes (technically the same as above but scoped differently?)
async function getMethodAnalytes(req, res, next) {
  try {
    const method = await Method.findByPk(req.params.id, {
      include: [Matrix, { model: MethodAnalyte, include: [Analyte] }],
    });
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

    await method.update(req.body, { user: req.user?.username || "system" });
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
    await method.destroy({ user: req.user?.username || "system" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMethod,
  getMethods,
  getMethodAnalytes,
  updateMethod,
  deleteMethod,
  getMethodById,
};
