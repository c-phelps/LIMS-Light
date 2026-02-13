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

      status: {
        type: DataTypes.ENUM("DRAFT", "PENDING", "APPROVED", "REJECTED"),
        defaultValue: "DRAFT",
      },

      value: DataTypes.STRING,

      enteredById: DataTypes.UUID,
      enteredAt: DataTypes.DATE,

      submittedById: DataTypes.UUID,
      submittedAt: DataTypes.DATE,

      approvedById: DataTypes.UUID,
      approvedAt: DataTypes.DATE,

      rejectedById: DataTypes.UUID,
      rejectedAt: DataTypes.DATE,
      rejectionReason: DataTypes.TEXT,

      notes: DataTypes.TEXT,
    },
    {
      hooks: auditHooks,
    },
  );

  // domain methods

  // if status in array, can edit true, else false
  Result.prototype.canEdit = function () {
    return ["DRAFT", "REJECTED"].includes(this.status);
  };

  // locked when approved
  Result.prototype.isLocked = function () {
    return this.status === "APPROVED";
  };

  // checks if the current state is allowed for the operation that is calling this method
  Result.prototype.assertState = function (allowedStates) {
    if (!allowedStates.includes(this.status)) {
      const err = new Error(`Invalid stat transition from ${this.status}`);
      err.status = 409;
      throw err;
    }
  };

  // the following roles can approve, if user does not have either, this will return false
  Result.prototype.canApprove = function (user) {
    return ["SUPERVISOR", "ADMIN"].includes(user?.role);
  };

  Result.createForSample = async function ({ sample, methodAnalyte, value, user }) {
    if (!sample) {
      const err = new Error("Sample is required");
      err.status = 400;
      throw err;
    }
    if(!methodAnalyte){
      const err = new Error("Invalid MethodAnalyte");
      err.status = 400;
      throw err;
    }
    const result = await this.create({
      sampleId: sample.id,
      methodAnalyteId: methodAnalyte.id,
      value: value ?? null,
      status: "DRAFT",
      enteredById: value ? user?.id ?? null : null,
      enteredAt: value ? new Date() : null,
    })
  };

  // result entry validation
  Result.prototype.enter = async function (value, user) {
    // passes the status values that are allowed for results entry to see if current status matches
    // will err out if not allowed and exit fn
    // else proceed with entry
    this.assertState(["DRAFT", "REJECTED"]);
    this.value = value;
    this.enteredById = user?.id ?? null;
    this.enteredAt = new Date();

    // if currently REJECTED then null out the rejection info
    if (this.status === "REJECTED") {
      this.status = "DRAFT";
      this.rejectedById = null;
      this.rejectedAt = null;
      this.rejectionReason = null;
    }
    return this.save();
  };

  // result submission validation
  Result.prototype.submit = async function (user) {
    this.assertState(["DRAFT"]);

    if (!this.value) {
      const err = new Error("Result must have a value before submission");
      err.status = 400;
      throw err;
    }
    this.status = "PENDING";
    this.submittedById = user?.id ?? null;
    this.submittedAt = new Date();

    return this.save();
  };

  // approval validation
  Result.prototype.approve = async function (user) {
    this.assertState(["PENDING"]);
    if (!this.canApprove(user)) {
      const err = new Error("Insufficient permission to approve");
      err.status = 403;
      throw err;
    }
    if (this.enteredById === user?.id) {
      const err = new Error("User cannot approve their own result");
      err.status = 403;
      throw err;
    }

    this.status = "APPROVED";
    this.approvedById = user?.id ?? null;
    this.approvedId = new Date();

    return this.save();
  };

  // rejection
  Result.prototype.reject = async function (reason, user) {
    this.assertState(["PENDING"]);
    if (!this.canApprove(user)) {
      const err = new Error("Insufficient permission to reject");
      err.status = 403;
      throw err;
    }
    if (!reason) {
      const err = new Error("Reject reason required");
      err.status = 400;
      throw err;
    }

    this.status = "REJECTED";
    this.rejectedById = user?.id ?? null;
    this.rejectedAt = new Date();
    this.rejectionReason = reason;
    return this.save();
  };

  // model associations
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
    Result.belongsTo(models.user, {
      foreignKey: "rejectedById",
      as: "rejectedBy",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    Result.belongsTo(models.user, {
      foreignKey: "submittedById",
      as: "submittedBy",
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
