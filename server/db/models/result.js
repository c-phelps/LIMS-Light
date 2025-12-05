module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define("Result", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        sampleId: { type: DataTypes.UUID, allowNull: false },
        methodId: {type: DataTypes.INTEGER, allowNull: false },
        value: DataTypes.FLOAT,
        units: DataTypes.STRING,
        status: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        detectionLimit: DataTypes.FLOAT,
        approvedBy: DataTypes.STRING,
        notes: DataTypes.TEXT,
    },{
        hooks: {
            afterCreate: async (result, options) => {
                const AuditLog = sequelize.models.AuditLog;
                await AuditLog.create({
                    entityType: "result",
                    entityId: result.id,
                    action: "CREATE",
                    performedBy: options?.user || 'system',
                })
            },
            afterUpdate: async (result, options) =>{
                const AuditLog = sequelize.models.AuditLog;
                await AuditLog.create({
                    entityType: "result",
                    entityId: result.id,
                    action: "UPDATE",
                    changedFields: result._changed,
                    performedBy: options?.user || 'system',
                })
            },
            afterDestroy: async(result, options) =>{
                const AuditLog = sequelize.models.AuditLog;
                await AuditLog.create({
                    entityType: " result",
                    entityId: result.id,
                    action: "DELETE",
                    performedBy: options?.user || 'system',
                })
            }
        }
    });

    Result.associate = (models) => {
        Result.belongsTo(models.Sample, {foreignKey: "sampleId" });
        Result.belongsTo(models.Method, {foreignKey: "methodId" });
    }
    return Result;
}