// define relationships between models
module.exports = (models) => {
  const { Sample, Result, Method, Analyte, MethodAnalyte, Matrix } = models;
  // sample → Result
  Sample.hasMany(Result, { foreignKey: "sampleId", onDelete: "CASCADE" });
  Result.belongsTo(Sample, { foreignKey: "sampleId" });
  // MethodAnalyte → Result
  MethodAnalyte.hasMany(Result, { foreignKey: "methodAnalyteId" });
  Result.belongsTo(MethodAnalyte, { foreignKey: "methodAnalyteId" });
  // Matrix → Method
  Matrix.hasMany(Method, { foreignKey: "matrixId" });
  Method.belongsTo(Matrix, { foreignKey: "matrixId" });
  // Method → MethodAnalyte
  Method.hasMany(MethodAnalyte, { foreignKey: "methodId" });
  MethodAnalyte.belongsTo(Method, { foreignKey: "methodId" });
  // Analyte → MethodAnalyte
  Analyte.hasMany(MethodAnalyte, { foreignKey: "analyteId" });
  MethodAnalyte.belongsTo(Analyte, { foreignKey: "analyteId" });
};
