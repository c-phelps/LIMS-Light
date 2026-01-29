function mapAvailableMethodAnalyte(ma) {
  return {
    id: ma.id,
    methodName: ma.Method.methodName,
    analyteName: ma.Analyte.analyteName,
    analyteCode: ma.Analyte.analyteCode,
    unit: ma.unit,
    detectionLimit: ma.detectionLimit,
    quantitationLimit: ma.quantitationLimit,
  }
}

module.exports = { mapAvailableMethodAnalyte };