//crud logic for results
const { Result, Method, Analyte, Sample, MethodAnalyte, Matrix, User } = require("../../db/index.cjs");
const { resultDetails } = require("../mappers/result.mapper.cjs");

// simple helper function to allow for testing
function isSystemUser(user) {
  return !user || user.username === "system";
}
// simple helper to determine if appropriate permissions exist
function hasApprovalRole(user) {
  return ["SUPERVISOR", "ADMIN"].includes(user?.role);
}

// retrieve with filters (skeleton for now)
async function getResultsByFilter(req, res, next) {
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
          include: [{ model: Method, include: [Matrix] }, Analyte],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    // pass data to mapper to reformat to resultDetails -- mappers/results.mapper.cjs
    res.json(resultDetails(results));
  } catch (err) {
    next(err);
  }
}

// retrieve results for specific id
async function getResultsById(req, res, next) {
  try {
    const results = await Result.findByPk(req.params.id, {
      include: [
        {
          model: MethodAnalyte,
          include: [{ model: Method, include: [Matrix] }, Analyte],
        },
        {
          model: User,
          as: "enteredBy",
        },
        {
          model: User,
          as: "approvedBy",
        },
      ],
    });
    // pass data to mapper to reformat to resultDetails -- mappers/results.mapper.cjs
    res.json(resultDetails(results));
  } catch (err) {
    next(err);
  }
}

// retrieve results for specific sample
async function getResultsBySample(req, res, next) {
  try {
    const results = await Result.findAll({
      where: { sampleId: req.params.sampleId },
      include: [
        {
          model: MethodAnalyte,
          include: [{ model: Method, include: [Matrix] }, Analyte],
        },
        {
          model: User,
          as: "enteredBy",
        },
        {
          model: User,
          as: "approvedBy",
        },
      ],
    });
    if (results.length === 0) return res.status(404).json({ error: "No results for this sample" });
    // map the results to reformat to resultDetails -- mappers/results.mapper.cjs
    res.json(results.map(resultDetails));
  } catch (err) {
    next(err);
  }
}

// update result by id
async function updateResult(req, res, next) {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: "Result not found" });
    if (result.status === "APPROVED") {
      throw new Error("Approved results cannot be modified");
    }
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
    if (!isSystemUser(req.user) && !hasApprovalRole(req.user))
      return res.status(400).json({ error: "User does not have sufficient privileges for deletion" });
    await result.destroy({ user: req.user?.username || "system" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// create result
async function createResult(req, res, next) {
  try {
    const { sampleId, methodAnalyteId, value } = req.body;
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

    // prior to creation am I checking here for validation?
    const result = await Result.createForSample({
      sample,
      methodAnalyte,
      value,
      user: req.user,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// result approval controller
async function approveResult(req, res, next) {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: "Result not found" });

    // pass req.user to model methods for validation
    await result.approve(req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// results denied controller
async function rejectResult(req, res, next) {
  try {
    const { reason } = req.body;

    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: "Result not found" });

    // pass reason, req.user to model methods for validation
    await result.reject(reason, req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// results submission controller
async function submitResult(req, res, next) {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: "Result not found" });

    // pass req.user to model methods for validation
    await result.submit(req.user);
    res.json(result);
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
  getResultsByFilter,
  approveResult,
  rejectResult,
  submitResult,
};
