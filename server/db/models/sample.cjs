const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("sample", sequelize);
  const Sample = sequelize.define(
    "Sample",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      sampleName: { type: DataTypes.STRING, allowNull: false, unique: true },
      sampleType: DataTypes.STRING,
      matrix: DataTypes.ENUM("WATER", "SOIL", "AIR", "OTHER"),
      collectedBy: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      receivedDate: DataTypes.DATE,
      notes: DataTypes.TEXT,
    },
    {
      hooks: auditHooks,
    },
  );
  return Sample;
};
