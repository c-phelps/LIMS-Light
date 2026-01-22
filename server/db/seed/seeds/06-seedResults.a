const { Result } = require("../../models/index.cjs");
const resultData = require("../data/results.json");

const seedResults = async () => {
  await Result.bulkCreate(resultData);
  console.log("Results seeded successfully!");
};

module.exports = seedResults;
