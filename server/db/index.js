// import sequelize, models and associations
// sync db connection and export sequelize instance and models

const sequelize = require('./sequelize');
const models = require('./models');
require('./associations')(models);

const connectAndSync = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected and synced successfully!");
}

module.exports = {sequelize, ...models, connectAndSync}