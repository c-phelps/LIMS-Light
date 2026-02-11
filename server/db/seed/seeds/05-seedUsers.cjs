const { User } = require("../../models/index.cjs");
const userData = require("../data/users.json");

const seedUsers = async () => {
  await User.bulkCreate(userData);
  console.log("Users seeded successfully!");
};

module.exports = seedUsers;