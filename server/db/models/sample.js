// define and export Sample model
module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define("Sample", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sample_type: DataTypes.STRING,
    collected_by: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    receivedDate: DataTypes.DATE,
    notes: DataTypes.TEXT,
  }, {
    hooks: {
      afterCreate: async (sample, options) =>{
        const AuditLog = sequelize.models.AuditLog;
        await AuditLog.create({
          entityType: "sample",
          entityId: sample.id,
          action: "CREATE",
          performedBy: options?.user || 'system',
        });
      },
      afterUpdate: async (sample, options) =>{
        const AuditLog = sequelize.models.AuditLog;
        await AuditLog.create({
          entityType: "sample",
          entityId: sample.id,
          action: "UPDATE",
          changedFields: sample._changed,
          performedBy: options?.user || 'system',
        })
      },
      afterDestroy: async (sample, options) =>{
        const AuditLog = sequelize.models.AuditLog;
        await AuditLog.create({
          entityType: "sample",
          entityId: sample.id,
          action: "DELETE",
          performedBy: options?.user || 'system',
        })
      }
    }
  });
  return Sample;
};
