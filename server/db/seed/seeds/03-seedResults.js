const sequelize = require("../..");
const { Result } = require("../../models");

const resultData = require("../data/results.json");

const seedResults = async () => {
  await Result.bulkCreate(resultData);
  console.log("Results seeded successfully!");
};

module.exports = seedResults;
