const sequelize = require("../..");
const { Method } = require("../../models");

const methodData = require("../data/methods.json");

const seedMethods = async () => {
  await Method.bulkCreate(methodData);
  console.log("Methods seeded successfully!");
};

module.exports = seedMethods;
