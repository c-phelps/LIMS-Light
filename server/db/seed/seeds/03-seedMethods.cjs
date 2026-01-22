const { Method, Matrix } = require("../../models/index.cjs");
const methodData = require("../data/methods.json");

const seedMethods = async () => {
  for (const method of methodData) {
    const matrix = await Matrix.findOne({
      where: { matrixName: method.matrixName },
    });
    
    if (!matrix) throw new Error(`Matrix not found ${method.matrixName}`);

    await Method.findOrCreate({
      where: { methodName: method.methodName },
      defaults: {
        description: method.description,
        matrixId: matrix.id,
      },
    });
  }
  console.log("Methods seeded successfully!");
};

module.exports = seedMethods;
