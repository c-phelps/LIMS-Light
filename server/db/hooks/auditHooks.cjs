// separating hooks for DRY
function withAuditHooks(entityType, sequelize) {
  return {
    afterCreate: async (instance, options) => {
      const AuditLog = sequelize.models.AuditLog;
      await AuditLog.create({
        entityType,
        entityId: instance.id,
        action: "CREATE",
        performedBy: options?.user || "system",
      });
    },
    afterUpdate: async (instance, options) => {
      const AuditLog = sequelize.models.AuditLog;
      await AuditLog.create({
        entityType,
        entityId: instance.id,
        action: "UPDATE",
        changedFields: instance._changed,
        performedBy: options?.user || "system",
      });
    },
    afterDestroy: async (instance, options) => {
      const AuditLog = sequelize.models.AuditLog;
      await AuditLog.create({
        entityType,
        entityId: instance.id,
        action: "DELETE",
        performedBy: options?.user || "system",
      });
    },
  };
}

module.exports = withAuditHooks;