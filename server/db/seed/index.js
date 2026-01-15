const fs = require("fs");
const path = require ("path");
const { sequelize, connectAndSync } = require("../");

const runSeeds = async () => {
  try {
    await connectAndSync({ force: true });
    // sets the absolute path for the current directory that is being manipulated
    const dir = path.join(__dirname, "seeds");
    const files = fs.readdirSync(dir).sort();
    // loops through the array of files that are in the directory stored here by readdirSync
    for (const file of files) {
      if (!file.endsWith(".js")) continue;
      // the full file from the directory combined
      // loads the current file at the filepath into memory to be ran
      const seedFunction = require(path.join(dir, file));
      // let us know the seeding is happening on file
      console.log(`Running Seed: ${file}`);
      // unnecessary for our purposes as each export will only have one function, but will loop through exported functions
      // and check if each value is a function type and if it is, will asynchronously run the function
      if (typeof seedFunction !== "function") {
        console.log(`${file} does not export a function`);
      }
      await seedFunction();
    }
    console.log("All seeds completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed: ", err);
  }
};

runSeeds();
