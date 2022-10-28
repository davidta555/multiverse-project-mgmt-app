const { user, project, issue } = require("./src/data/seedData");
const sequelize = require("./src/db"); //Database
const { User, Project, Issue } = require("./src/models/index");
const debug = require("debug")("app:seeder");

const populateDb = async () => {
  debug("Populating DB...");
  console.log("Populating DB...");
  try {
    await sequelize.sync({ force: true }); //reset the database
    await User.bulkCreate(user);
    await Project.bulkCreate(project);
    await Issue.bulkCreate(issue); //populate database
    debug("SUCCESS: Database has been re-populated...");
    console.log("SUCCESS: Database has been re-populated...");
    process.exit();
  } catch (error) {
    debug(`Error with seeding database: `, error.message);
    console.log(`Error with seeding database: `, error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  populateDb();
} else {
  debug("No changes to database");
}
