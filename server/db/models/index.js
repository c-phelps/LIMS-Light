// imports all model files, injects sequelize instance and exports one object with all models
// TODO: add model for each table
const fs = require('fs');
const path = require('path');
const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const models = {};
// gather each file in the directory, rather than individually importing each one
 fs.readdirSync(__dirname).filter(file => file !== 'index.js').forEach(file =>{
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
 });

 module.exports = models;