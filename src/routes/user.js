const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const User = require("../models/index");

const router = express.Router();

const {
  getAllUsers,
  searchUsersByName,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("*/", getAllUsers);
router.get("/search", searchUsersByName);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
