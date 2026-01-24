function methodDetails(method) {
  const matrix = method.Matrix;
  const methodAnalyte = method.MethodAnalytes;
  return {
    id: method.id,
    methodName: method.methodName,
    description: method.description,
    matrixName: matrix.matrixName,
    analytes: methodAnalyte.map((ma) => ({
      methodAnalyteId: ma.id,
      reportingOrder: ma.reportingOrder,
      unit: ma.unit,
      detectionLimit: ma.detectionLimit,
      quantitationLimit: ma.quantitationLimit,

      analyteId: ma.Analyte.id,
      analyteName: ma.Analyte.analyteName,
      analyteCode: ma.Analyte.analyteCode,
      description: ma.Analyte.description,
    })),
  };
}

function methodList(method) {
  const matrix = method.Matrix;
  const methodAnalyte = method.MethodAnalytes;
  return {
    id: method.id,
    methodName: method.methodName,
    description: method.description,
    matrixName: matrix.matrixName,
    createdAt: method.createdAt,
    updatedAt: method.updatedAt,
    analyteIds: methodAnalyte.map((ma) => ma.analyteId),
  };
}

module.exports = { methodDetails, methodList };

// getMethods
// getMethodById
// getMethodAnalytes
