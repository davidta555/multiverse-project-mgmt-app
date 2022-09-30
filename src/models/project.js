const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const Project = sequelize.define("project", {
  title: Sequelize.STRING,
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE,
  description: Sequelize.TEXT("long"),
});

module.exports = Project;
