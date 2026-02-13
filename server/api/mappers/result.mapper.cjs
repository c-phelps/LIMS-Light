function resultDetails(result) {
  const methodAnalyte = result.MethodAnalyte;
  const method = result.MethodAnalyte.Method;
  const matrix = result.MethodAnalyte.Method.Matrix;
  const analyte = result.MethodAnalyte.Analyte;
  return {
    id: result.id,
    value: result.value,
    status: result.status,
    enteredBy: result.enteredBy.userName,
    enteredAt: result.enteredAt,
    submittedBy: result.submittedBy.userName,
    submittedAt: result.submittedAt,
    approvedBy: result.approvedBy.userName,
    approvedAt: result.approvedAt,
    rejectedBy: result.rejectedBy.userName,
    rejectedAt: result.rejectedAt,
    rejectionReason: result.rejectionReason,
    notes: result.notes,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    methodAnalyteId: methodAnalyte.id,
    unit: methodAnalyte.unit,
    detectionLimit: methodAnalyte.detectionLimit,
    quantitationLimit: methodAnalyte.quantitationLimit,
    reportingOrder: methodAnalyte.reportingOrder,
    methodName: method.methodName,
    matrixName: matrix.matrixName,
    analyteName: analyte.analyteName,
    analyteCode: analyte.analyteCode,
    canEdit: result.canEdit(),
    isLocked: result.isLocked(),
  };
}

module.exports = { resultDetails };
