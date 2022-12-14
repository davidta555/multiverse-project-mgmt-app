const User = require("./user");
const Project = require("./project");
const Issue = require("./issue");

//user and project association
User.hasMany(Project);
Project.belongsTo(User);

//user and issue association
User.hasMany(Issue);
Issue.belongsTo(User);

// Issue.hasOne(User, { foreignKey: "id", as: "AssignedUserId" });
// User.belongsTo(Issue);

//project issue association
Project.hasMany(Issue);
Issue.belongsTo(Project);

module.exports = {
  User,
  Project,
  Issue,
};
