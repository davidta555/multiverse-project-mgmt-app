const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const Issue = sequelize.define("issue", {
  title: Sequelize.STRING,
  date_created: Sequelize.DATE,
  description: Sequelize.TEXT("long"),
  hours_spend: Sequelize.INTEGER,
  status: Sequelize.STRING,
  AssignedUserId: Sequelize.INTEGER,
});

module.exports = Issue;
