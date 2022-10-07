const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const Project = require("../models/index");

const router = express.Router();

const {} = require("../controllers/user");

router.get("*/", getAllProjects);
router.get("/search", searchProjectsByName);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
