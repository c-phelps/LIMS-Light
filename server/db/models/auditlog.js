const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const AuditLog = sequelize.define('AuditLog',{
        entityTpe:{
            type: DataTypes.STRING,
            allowNull: false
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        changeFields: {
            type: DataTypes.JSON,
            allowNull: true
        },
        performedBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return AuditLog;
}
