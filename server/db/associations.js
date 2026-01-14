// define relationships between models
module.exports = (models) => {
  const { Sample, Result } = models;
  Sample.hasMany(Result, { foreignKey: "sampleId", onDelete: "CASCADE" });
  Result.belongsTo(Sample, { foreignKey: "sampleId" });
};
