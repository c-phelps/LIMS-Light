const arg = process.argv.slice(2);
const begin = parseInt(arg[0], 10);
const end = parseInt(arg[1], 10);
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../../index.cjs");

async function runSeeds(beginIndex, endIndex) {
  try {
    if (beginIndex === 0) {
      await sequelize.sync({ force: true });
      console.log("Tables dropped and recreated");
    }

    // sets the absolute path for the current directory that is being manipulated
    const dir = path.join(__dirname, "..", "seeds");
    const files = fs.readdirSync(dir).sort();
    // modally runs either --- 1 or --- 2 which determines if it
    
    for (let i = beginIndex; i < endIndex; i++) {
      if (!files[i].endsWith(".cjs")) continue;
      // the full file from the directory combined
      // loads the current file at the filepath into memory to be ran
      const seedFunction = require(path.join(dir, files[i]));
      // let us know the seeding is happening on file
      console.log(`Running Seed: ${files[i]}`);

      if (typeof seedFunction !== "function") {
        console.log(`${files[i]} does not export a function`);
      }
      await seedFunction();
    }
    console.log("All seeds completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed: ", err);
  }
}

runSeeds(begin, end);
