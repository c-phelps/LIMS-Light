const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("result", sequelize);
  const Result = sequelize.define(
    "Result",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

      sampleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Samples",
          key: "id",
        },
      },

      methodAnalyteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "MethodAnalytes",
          key: "id",
        },
      },

      value: DataTypes.FLOAT,

      status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
      },

      approvedBy: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      hooks: auditHooks,
    },
  );

  Result.associate = (models) => {
    Result.belongsTo(models.Sample, {
      foreignKey: "sampleId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Result.belongsTo(models.MethodAnalyte, {
      foreignKey: "methodAnalyteId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Result;
};
