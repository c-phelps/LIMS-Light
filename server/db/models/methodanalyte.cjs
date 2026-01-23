const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("methodanalyte", sequelize);
  const MethodAnalyte = sequelize.define(
    "MethodAnalyte",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      methodId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Methods",
          key: "id",
        },
      },

      analyteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Analytes",
          key: "id",
        },
      },

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

    MethodAnalyte.belongsTo(models.Method, {
      foreignKey: "methodId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MethodAnalyte.hasMany(models.Result, {
      foreignKey: "methodAnalyteId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return MethodAnalyte;
};
