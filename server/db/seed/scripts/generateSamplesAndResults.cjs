// use faker to simplify the random data gen
const { writeFile, mkdir } = require("fs/promises");
const { Matrix, MethodAnalyte, Method } = require("../../../db/index.cjs");
const { data } = require("autoprefixer");

async function generateSamplesAndResults() {
  const samples = [];
  const results = [];
  const users = [];
  const roles = ["TECH", "SUPERVISOR", "ADMIN"];
  // due to versioning issues faker will need to be dynamically imported rather than using require
  const fakerModule = await import("@faker-js/faker");
  const { faker } = fakerModule;

  for (let i = 0; i < 8; i++) {
    const currentUser = faker.person.lastName();
    const user = {
      id: faker.string.uuid(),
      userName: currentUser,
      role: i > 2 ? faker.helpers.arrayElement(roles) : roles[i],
      email: faker.internet.email({ firstName: currentUser }),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
    };
    users.push(user);
  }

  const matrixData = await Matrix.findAll({ order: [["matrixName", "ASC"]] });
  const matrixIds = matrixData.map((data) => data.id);

  // generate sample data for results
  for (let i = 0; i < 40; i++) {
    const sampleCollector = faker.helpers.arrayElement(users);
    const sampleCreator = faker.helpers.arrayElement(users);
    // create a sample object
    const sample = {
      id: faker.string.uuid(),
      sampleName: faker.lorem.words(2),
      matrixId: faker.helpers.arrayElement(matrixIds),
      sampleType: faker.string.alphanumeric(5).toUpperCase(),
      createdById: sampleCreator.id,
      collectedById: sampleCollector.id,
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      receivedDate: faker.date.recent().toISOString(),
      notes: faker.lorem.sentence(),
    };
    samples.push(sample);

    // grab a random method from the available methods where the matrix matches the sample matrix
    const methodData = await Method.findAll({
      where: {
        matrixId: sample.matrixId,
      },
      attributes: ["id"],
    });

    const methods = methodData.map((data) => data.id);
    if (methods.length === 0) continue;
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];
    
    const methodAnalyteData = await MethodAnalyte.findAll({
      where: {
        methodId: randomMethod,
      },
      attributes: ["id"],
    });

    const methodAnalytes = methodAnalyteData.map((data) => data.id);

    for (const methodAnalyte of methodAnalytes) {
      // variables specific to the current result
      const resultEnteredBy = faker.helpers.arrayElement(users);
      const resultApprovedBy = faker.helpers.arrayElement(users.filter((u) => {return u !== resultEnteredBy && u.role !== "TECH"}));
      const resultStatus = faker.helpers.arrayElement(["DRAFT", "PENDING", "APPROVED", "REJECTED"]);

      const result = {
        id: faker.string.uuid(),
        sampleId: sample.id,
        methodAnalyteId: methodAnalyte,
        value: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
        status: resultStatus,
        enteredById: resultEnteredBy.id,
        // passing approvedBy only for approved results
        approvedById: resultStatus === "APPROVED" ? resultApprovedBy.id : null,
        approvedAt: resultStatus === "APPROVED" ? faker.date.recent().toISOString() : null,
        notes: faker.lorem.sentence(),
      };
      results.push(result);
    }
  }
  return { samples, results, users };
}

async function writeData() {
  try {
    // retrieve destructured samples and results
    const { samples, results, users } = await generateSamplesAndResults();
    await mkdir("server/db/seed/data/", { recursive: true });

    for (const r of results) {
      if (typeof r.value !== "number") {
        console.log("Non-numeric value detected:", r);
      }
    }
    console.log(`Generated ${samples.length} samples and ${results.length} results.`);
    if (samples.length === 0) {
      console.log("No samples generated.");
    }

    // write the samples and results to their respective json files
    await writeFile("server/db/seed/data/samples.json", JSON.stringify(samples, null, 2));
    await writeFile("server/db/seed/data/results.json", JSON.stringify(results, null, 2));
    await writeFile("server/db/seed/data/users.json", JSON.stringify(users, null, 2));
    console.log("Sample, result, and user data generated successfully.");
  } catch (error) {
    console.error("Error writing data to files:", error);
  }
}

writeData();
