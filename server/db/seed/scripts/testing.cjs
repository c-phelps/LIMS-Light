const { Sample, Result, MethodAnalyte, Method, Analyte } = require("../../../db/index.cjs");

async function TestSamples() {
  const sampleData = await Sample.findAll({
    include: {
      model: Result,
      include: {
        model: MethodAnalyte,
        include: [Method, Analyte],
      },
    },
  });
  console.log(sampleData);
  console.log(sampleData.length, " entries");
}

TestSamples();
