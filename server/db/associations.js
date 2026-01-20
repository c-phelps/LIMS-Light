// define relationships between models
module.exports = (models) => {
  const { Sample, Result, Method, Analyte, MethodAnalyte, Matrix } = models;
  Sample.hasMany(Result, { foreignKey: "sampleId", onDelete: "CASCADE" });
  Result.belongsTo(Sample, { foreignKey: "sampleId" });

  Method.hasMany(Result, { foreignKey: "methodId" });
  Result.belongsTo(Method, { foreignKey: "methodId" });

  Analyte.hasMany(Result, { foreignKey: "analyteId" });
  Result.belongsTo(Analyte, { foreignKey: "analyteId" });

  Matrix.hasMany(Method, { foreignKey: "matrixId" });
  Method.belongsTo(Matrix, { foreignKey: "matrixId" });

  Method.hasMany(MethodAnalyte, { foreignKey: "methodId" });
  MethodAnalyte.belongsTo(Method, { foreignKey: "methodId" });

  Analyte.hasMany(MethodAnalyte, { foreignKey: "analyteId" });
  MethodAnalyte.belongsTo(Analyte, { foreignKey: "analyteId" });
};
