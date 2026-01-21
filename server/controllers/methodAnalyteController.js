const { MethodAnalyte, Analyte, Method } = require("../db");

// define which analyes belong to a method
async function getMethodAnalytes(req, res, next) {
  try {
    const { methodId } = req.query;

    const rows = await MethodAnalyte.findAll({
      where: { methodId },
      include: [Analyte],
      order: [["reportingOrder", "ASC"]],
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// add analyte to a method
async function addAnalyteToMethod(req, res, next) {
  try {
    const { methodId } = req.params;
    const { analyteId, unit, detectionLimit, quntitationLimit, reportingOrder } = req.body;

    // validate method exists
    const method = await Method.findByPk(methodId);
    if (!method) {
      return res.status(404).json({ error: "Method not found for addAnalyteToMethod!" });
    }

    // validate analyte exists
    const analyte = await Analyte.findByPk(analyteId);
    if (!analyte) {
      return res.status(404).json({ error: "Analyte not found for addAnalyteToMethod!" });
    }

    // UX unique enforcement
    const exists = await MethodAnalyte.findOne({
      where: { methodId, analyteId },
    });

    if (existing) {
      return res.status(409).json({
        error: "Analyte already assigned to this method",
      });
    }

    // create
    const row = await MethodAnalyte.create(
      { methodId, analyteId, unit, detectionLimit, quntitationLimit, reportingOrder },
      { user: req.user?.username || "system" },
    );

    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
}

// update analyte configuration
async function updateMethodAnalyte(req, res, next) {
  try {
    const { id } = req.params;
    const row = await MethodAnalyte.findByPk(id);
    if (!row) {
      return res.status(404).json({ error: "MethodAnalyte not found!" });
    }
    await row.update({ user: req.user?.username || "system" });
  } catch (err) {
    next(err);
  }
}

// remove analyte fro method
async function removeAnalyteFromMethod(req, res, next) {
  try {
    const { id } = req.params;
    const row = await MethodAnalyte.findByPk(id);
    if (!row) {
      return res.status(404).json({ error: "MethodAnalyte not found" });
    }

    await row.destroy({ user: req.user?.username || "system" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMethodAnalytes,
  addAnalyteToMethod,
  updateMethodAnalyte,
  removeAnalyteFromMethod,
};
