const { Sample } = require("../../models/index.cjs");
const sampleData = require("../data/samples.json");

const seedSamples = async () => {
  await Sample.bulkCreate(sampleData);
  console.log("Samples seeded successfully!");
};

module.exports = seedSamples;
