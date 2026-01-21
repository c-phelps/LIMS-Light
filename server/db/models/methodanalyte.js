import withAuditHooks from "../hooks/auditHooks.js";
module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("methodanalyte");
  const MethodAnalyte = sequelize.define(
    "MethodAnalyte",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

      methodId: { type: DataTypes.UUID, allowNull: false },
      analyteId: { type: DataTypes.UUID, allowNull: false },

      unit: DataTypes.STRING,
      detectionLimit: DataTypes.FLOAT,
      quantitationLimit: DataTypes.FLOAT,

      reportingOrder: DataTypes.INTEGER,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["methodId", "analyteId"],
        },
      ],
    },
    {
      hooks: auditHooks,
    },
  );

  MethodAnalyte.associate = (models) => {
    MethodAnalyte.belongsTo(models.Analyte, { foreignKey: "analyteId" });
    MethodAnalyte.belongsTo(models.Method, { foreignKey: "methodId" });
  };
  return MethodAnalyte;
};
