const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const User = require("../models/index");

const router = express.Router();

const {
  getAllUsers,
  // searchUsersByName,
  getUserById,
  getCurrentUser,
  // createUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const createAuth0User = async (req, res, next) => {
  const [user] = await User.findOrCreate({
    where: {
      username: req.oidc.user.nickname,
      name: req.oidc.user.given_name,
      email: req.oidc.user.email,
    },
  });
  console.log(req.oidc.user);
  console.log(user);
  next();
};

router.get("*/", getAllUsers);
// router.get("/search", searchUsersByName);
router.get("/:id", getUserById);
router.get("/me", createAuth0User, getCurrentUser);
// router.post("/", createUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
