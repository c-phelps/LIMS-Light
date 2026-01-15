const methodData = require("../data/methods.json");
// use faker to simplify the random data gen
const { writeFile, mkdir } = require("fs/promises");

async function generateSamplesAndResults() {
  const samples = [];
  const results = [];
  // create an array of 6 or so users to keep the data looking consistent
  const user = [];
  // due to versioning issues faker will need to be dynamically imported rather than using require
  const fakerModule = await import("@faker-js/faker");
  const { faker } = fakerModule;
  // create an array to hold the sample and results
  for (let i = 0; i < 6; i++) {
    user.push(faker.person.lastName());
  }

  // generate sample data for results
  for (let i = 0; i < 50; i++) {
    // create a sample object
    const sample = {
      id: faker.string.uuid(),
      sampleName: faker.lorem.words(3),
      sampleType: faker.string.alphanumeric(5).toUpperCase(),
      matrix: faker.helpers.arrayElement(["WATER", "SOIL", "AIR", "OTHER"]),
      collectedBy: faker.helpers.arrayElement(user),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      receivedDate: faker.date.recent().toISOString(),
      notes: faker.lorem.sentence(),
    };
    samples.push(sample);
    // grab a random method from the available methods where the matrix matches the sample matrix
    const applicableMethods = methodData.filter((method) => method.matrix === sample.matrix);
    const method = faker.helpers.arrayElement(applicableMethods);

    for (let j = 0; j < faker.number.int({ min: 1, max: 3 }); j++) {
      const result = {
        id: faker.string.uuid(),
        sampleId: sample.id,
        methodId: method.id,
        value: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        units: method.units,
        status: faker.helpers.arrayElement(["PENDING", "APPROVED", "REJECTED"]),
        detectionLimit: method.detectionLimit,
        approvedBy: faker.helpers.arrayElement(user),
        notes: faker.lorem.sentence(),
      };
      results.push(result);
    }
  }
  return { samples, results };
}

async function writeData() {
  try {
    // retrieve destructured samples and results
    const { samples, results } = await generateSamplesAndResults();
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
    console.log("Sample and result data generated successfully.");
  } catch (error) {
    console.error("Error writing data to files:", error);
  }
}

writeData();
