module.exports = (sequelize, DataTypes) => {
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
      hooks: {
        afterCreate: async (result, options) => {
          const AuditLog = sequelize.models.AuditLog;
          await AuditLog.create({
            entityType: "result",
            entityId: result.id,
            action: "CREATE",
            performedBy: options?.user || "system",
          });
        },
        afterUpdate: async (result, options) => {
          const AuditLog = sequelize.models.AuditLog;
          await AuditLog.create({
            entityType: "result",
            entityId: result.id,
            action: "UPDATE",
            changedFields: result._changed,
            performedBy: options?.user || "system",
          });
        },
        afterDestroy: async (result, options) => {
          const AuditLog = sequelize.models.AuditLog;
          await AuditLog.create({
            entityType: "result",
            entityId: result.id,
            action: "DELETE",
            performedBy: options?.user || "system",
          });
        },
      },
    },
  );

  Result.associate = (models) => {
    Result.belongsTo(models.Sample, { foreignKey: "sampleId" });
    Result.belongsTo(models.Method, { foreignKey: "methodId" });
    Result.belongsTo(models.Analyte, { foreignKey: "analyteId" });
  };
  return Result;
};
