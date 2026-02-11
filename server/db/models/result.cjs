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
        type: DataTypes.ENUM("DRAFT", "PENDING", "APPROVED", "REJECTED"),
        defaultValue: "DRAFT",
      },
      enteredById: DataTypes.UUID,
      approvedById: DataTypes.UUID,
      notes: DataTypes.TEXT,
      approvedAt: DataTypes.DATE,
    },
    {
      hooks: auditHooks,
    },
  );
  
  Result.prototype.canEdit = function () {
    return ["DRAFT", "REJECTED"].includes(this.status);
  };

  Result.prototype.isLocked = function () {
    return this.status === "APPROVED";
  };

  Result.associate = (models) => {
    Result.belongsTo(models.Sample, {
      foreignKey: "sampleId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Result.belongsTo(models.User, {
      foreignKey: "enteredById",
      as: "enteredBy",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Result.belongsTo(models.User, {
      foreignKey: "approvedById",
      as: "approvedBy",
      onDelete: "SET NULL",
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
