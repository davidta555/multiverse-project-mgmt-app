const sequelize = require("../db");
const User = require("../models/user");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findByPk(userId);
    if (user.admin) {
      next();
    } else {
      res.status(401).json({ message: "Must be admin to access" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = isAdmin;
