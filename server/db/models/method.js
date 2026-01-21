import withAuditHooks from "../hooks/auditHooks.js";

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("method");
  const Method = sequelize.define(
    "Method",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      methodName: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: DataTypes.TEXT,
      matrixId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      hooks: auditHooks,
    },
  );

  Method.associate = (models) => {
    Method.belongsTo(models.Matrix, { foreignKey: "matrixId" });
  };
  return Method;
};
