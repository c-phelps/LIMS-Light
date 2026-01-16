// import sequelize, models and associations
// sync db connection and export sequelize instance and models

const sequelize = require("./sequelize");
const models = require("./models");
require("./associations")(models);

const connectAndSync = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected and synced successfully!");
  } catch (err) {
    console.error("DB connection and/or sync failed:", err);
    process.exit(1);
  }
};

module.exports = { sequelize, ...models, connectAndSync };
