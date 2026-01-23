const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("method", sequelize);
  const Method = sequelize.define(
    "Method",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      methodName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      matrixId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Matrices",
          key: "id",
        },
      },

      description: DataTypes.TEXT,
    },
    {
      hooks: auditHooks,
    },
  );

  Method.associate = (models) => {
    Method.belongsTo(models.Matrix, { foreignKey: "matrixId" });

    Method.hasMany(models.MethodAnalyte, {
      foreignKey: "methodId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Method;
};
