const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const User = require("../models/index");

const router = express.Router();

const {} = require("../controllers/user");

router.get("*/", getAllUsers);
router.get("/search", searchUsersByName);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
