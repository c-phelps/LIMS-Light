const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("result", sequelize);
  const Result = sequelize.define(
    "Result",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      sampleId: { type: DataTypes.UUID, allowNull: false },
      methodAnalyteId: { type: DataTypes.UUID, allowNull: false },

      value: DataTypes.FLOAT,
      status: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      approvedBy: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      hooks: auditHooks,
    },
  );

  Result.associate = (models) => {
    Result.belongsTo(models.Sample, { foreignKey: "sampleId" });
    Result.belongsTo(models.MethodAnalyte, { foreignKey: "methodAnalyteId" });
  };
  return Result;
};
