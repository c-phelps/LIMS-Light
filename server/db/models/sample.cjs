const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("sample", sequelize);
  const Sample = sequelize.define(
    "Sample",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      sampleName: {
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

      sampleType: DataTypes.STRING,
      createdById: DataTypes.UUID,
      collectedById: DataTypes.UUID,
      createdAt: DataTypes.DATE,
      receivedDate: DataTypes.DATE,
      notes: DataTypes.TEXT,
    },
    {
      hooks: auditHooks,
    },
  );

  Sample.associate = (models) => {
    Sample.belongsTo(models.Matrix, {
      foreignKey: "matrixId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Sample.belongsTo(models.User, {
      foreignKey: "createdById",
      as: "createdBy",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Sample.belongsTo(models.User, {
      foreignKey: "collectedById",
      as: "collectedBy",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Sample.hasMany(models.Result, {
      foreignKey: "sampleId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Sample;
};
