const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const Issue = sequelize.define("issue", {
  title: Sequelize.STRING,
  date_created: Sequelize.DATE,
  description: Sequelize.TEXT("long"),
  status: Sequelize.INTEGER,
});

module.exports = Issue;
