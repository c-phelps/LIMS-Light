function sampleDetails(sample) {
  return {
    id: sample.id,
    sampleName: sample.sampleName,
    matrixName: sample.Matrix.matrixName,
    matrixCode: sample.Matrix.matrixCode,
    sampleType: sample.sampleType,
    createdAt: sample.createdAt,
    receivedDate: sample.receivedDate,
    notes: sample.notes,
    updatedAt: sample.updatedAt,
    resultCount: sample.Results.length,
    resultIds: sample.Results.map((data) => data.id),
  };
}

function sampleList(sample) {
  return {
    id: sample.id,
    sampleName: sample.sampleName,
    matrixName: sample.Matrix.matrixName,
    sampleType: sample.sampleType,
    createdAt: sample.createdAt,
    receivedDate: sample.receivedDate,
  };
}

module.exports = { sampleDetails, sampleList };
