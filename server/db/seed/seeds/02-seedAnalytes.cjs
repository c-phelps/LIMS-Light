const { Analyte } = require("../../models/index.cjs");
const analyteData = require("../data/analytes.json");

const seedAnalytes = async () => {
  await Analyte.bulkCreate(analyteData, {
    ignoreDuplicates: true,
  });
  console.log("Analytes seeded successfully!");
};

module.exports = seedAnalytes;