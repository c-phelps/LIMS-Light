const withAuditHooks = require("../hooks/auditHooks.cjs");

module.exports = (sequelize, DataTypes) => {
  const auditHooks = withAuditHooks("sample", sequelize);
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      
      role: {
        type: DataTypes.ENUM("TECH", "SUPERVISOR", "ADMIN"),
        defaultValue: "TECH",
      },

      createdAt: DataTypes.DATE,
    },
    {
      hooks: auditHooks,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Sample, {
      foreignKey: "createdById",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    
    User.hasMany(models.Sample, {
      foreignKey: "collectedById",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Result, {
      foreignKey: "enteredById",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Result, {
      foreignKey: "approvedById",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
