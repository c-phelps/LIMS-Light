const { Matrix } = require("../../models/index.cjs");
const matrixData = require("../data/matrices.json");

const seedMatrices = async () => {
  await Matrix.bulkCreate(matrixData, {
    ignoreDuplicates: true,
  });
  console.log("Matrices seeded successfully!");
};

module.exports = seedMatrices;
