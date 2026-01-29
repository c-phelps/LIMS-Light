const { MethodAnalyte, Analyte, Method, Sample, Result } = require("../../db/index.cjs");
const { mapAvailableMethodAnalyte } = require("../mappers/methodAnalyte.mapper.cjs");
const { Op } = require('sequelize'); 

// determine which analytes belong to a method
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

// filter and find all unused and available method/analytes for sample
async function getMethodAnalytesBySample(req, res, next) {
  try {
    const { sampleId } = req.params;

    const sample = await Sample.findByPk(sampleId);
    if (!sample) return res.status(404).json({ error: "Sample not found." });

    // retrieve methodAnalyteIds stored in the result table for the sample
    // filter the data to include specifically just the methodAnalyteIds as an array
    const usedMethodAnalyteIds = await Result.findAll({
      where: { sampleId },
      attributes: ["methodAnalyteId"],
    }).then((rows) => rows.map((r) => r.methodAnalyteId));

    // use array of currently used methodAnalyteIds as exclusion in where clause
    // join Method on matrixId from sample
    const methodAnalytes = await MethodAnalyte.findAll({
      include: [
        {
          model: Method,
          where: { matrixId: sample.matrixId },
        },
        { model: Analyte },
      ],
      where: usedMethodAnalyteIds.length ? { id: { [Op.notIn]: usedMethodAnalyteIds } } : undefined,
    });
    // return the data after passing it to the mapper
    res.json(methodAnalytes.map(mapAvailableMethodAnalyte));
  } catch (err) {
    next(err);
  }
}

// add analyte to a method
// POST
async function addAnalyteToMethod(req, res, next) {
  try {
    const { methodId } = req.params;
    const { analyteId, unit, detectionLimit, quantitationLimit, reportingOrder } = req.body;
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

    if (exists) {
      return res.status(409).json({
        error: "Analyte already assigned to this method",
      });
    }

    // create
    const row = await MethodAnalyte.create(
      { methodId, analyteId, unit, detectionLimit, quantitationLimit, reportingOrder },
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
    await row.update({
      unit,
      detectionLimit,
      quantitationLimit,
      reportingOrder,
      user: req.user?.username || "system",
    });
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
  getMethodAnalytesBySample,
};
