//crud logic for results
const { Result, Method, Analyte, Sample, MethodAnalyte } = require("../db");

// create result
async function createResult(req, res, next) {
  try {
    // validate sample
    const sample = await Sample.findByPk(req.body.sampleId);
    if(!sample) {
      return res.status(404).json({ error: "Sample not found for Result"});
    }
    // validate method
    const method = await Method.findByPk(req.bod.methodId);
    if(!method ){
      return res.status(404).json({error: "Method not found for Result"});
    }
    // validate analyte
    const analyte = await Analyte.findByPk(req.body.analyteId);
    if(!analyte){
      return res.status(404).json({error: "Analyte not found for Result"})
    }
    // enforce method - analyte contract
    const methodAnalyte = await MethodAnalyte.findOne({
      where: {
        methodId: req.body.methodId,
        analyteId: req.body.analyteId,
      },
    });
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
      include: [Sample, Method, Analyte],
      order: [["createdAt", "ASC"]],
    });

    res.json(results);
  } catch (err) {
    next(err);
  }
}

// retrieve specific results for sample
async function getResultsBySample(req, res, next) {
  try {
    const results = await Result.findAll({ where: { sampleId: req.params.sampleId } });
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
