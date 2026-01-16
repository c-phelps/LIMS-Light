// define relationships between models
module.exports = (models) => {
  const { Sample, Result, Method } = models;
  Sample.hasMany(Result, { foreignKey: "sampleId", onDelete: "CASCADE" });
  Result.belongsTo(Sample, { foreignKey: "sampleId" });

  Method.hasMany(Result, { foreignKey: "methodId" });
  Result.belongsTo(Method, { foreignKey: "methodId" });
};
