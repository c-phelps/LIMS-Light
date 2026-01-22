// imports all model files, injects sequelize instance and exports one object with all models
const fs = require("fs");
const path = require("path");
const sequelize = require("../sequelize.cjs");
const { DataTypes } = require("sequelize");

const models = {};
// gather each file in the directory, rather than individually importing each one
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const filter = require(path.join(__dirname, file));
    if (typeof filter !== "function") {
      console.error(`Skipping file ${file} as it does not export a function`);
      return;
    }
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

module.exports = models;
