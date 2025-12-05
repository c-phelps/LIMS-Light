// define relationships between models
module.exports = (models) => {
    const { Sample, Result } = models;
    Sample.hasMany(Result, {foreignKey: 'sample_id'});
    Result.belongsTo(Sample, {foreignKey: 'sample_id'});
}