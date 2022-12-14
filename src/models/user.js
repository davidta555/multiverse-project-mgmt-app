const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const User = sequelize.define("user", {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
});

module.exports = User;
