import withAuditHooks from "../hooks/auditHooks.js";

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("result");
  const Result = sequelize.define(
    "Result",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      sampleId: { type: DataTypes.UUID, allowNull: false },
      methodId: { type: DataTypes.UUID, allowNull: false },
      analyteId: { type: DataTypes.UUID, allowNull: false },

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
    Result.belongsTo(models.Method, { foreignKey: "methodId" });
    Result.belongsTo(models.Analyte, { foreignKey: "analyteId" });
  };
  return Result;
};
