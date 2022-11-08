const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("project_mgmt_db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
