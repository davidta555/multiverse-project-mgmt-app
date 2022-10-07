const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const Issue = require("../models/index");

const router = express.Router();

const {} = require("../controllers/user");

router.get("*/", getAllUsers);
router.get("/search", searchUsersByName);
router.get("/:id", getUserById);
router.post("/", createIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

module.exports = router;
