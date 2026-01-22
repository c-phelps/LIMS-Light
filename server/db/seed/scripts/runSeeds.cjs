const fs = require("fs");
const path = require("path");
const { sequelize } = require("../../index.cjs");

const runSeeds = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables dropped and recreated");
    // sets the absolute path for the current directory that is being manipulated
    const dir = path.join(__dirname, "..", "seeds");
    const files = fs.readdirSync(dir).sort();
    // loops through the array of files that are in the directory stored here by readdirSync
    for (const file of files) {
      if (!file.endsWith(".cjs")) continue;
      // the full file from the directory combined
      // loads the current file at the filepath into memory to be ran
      const seedFunction = require(path.join(dir, file));
      // let us know the seeding is happening on file
      console.log(`Running Seed: ${file}`);
      
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
