const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("project_mgmt_app", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
