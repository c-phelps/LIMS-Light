const { Method, Analyte, MethodAnalyte } = require("../../models/index.cjs");
const methodAnalyteData = require("../data/methodAnalytes.json");

const seedMethodAnalytes = async () => {
  for (const entry of methodAnalyteData) {
    const method = await Method.findOne({
      where: { methodName: entry.methodName },
    });
    if (!method) throw new Error(`Method not found: ${entry.methodName}`);
    const analyte = await Analyte.findOne({
      where: { analyteName: entry.analyteName },
    });
    if (!analyte) throw new Error(`Analyte not found: ${entry.analyteName}`);
    await MethodAnalyte.findOrCreate({
      where: {
        methodId: method.id,
        analyteId: analyte.id,
      },
      defaults: {
        unit: entry.unit,
        detectionLimit: entry.detectionLimit,
        quantitationLimit: entry.quantitationLimit,
        reportingOrder: entry.reportingOrder,
      },
    });
  }
  console.log("MethodAnalytes seeded successfully!");
};

module.exports = seedMethodAnalytes;
