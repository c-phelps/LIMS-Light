//create and export sequelize instance
const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.url, config.options);

module.exports = sequelize;