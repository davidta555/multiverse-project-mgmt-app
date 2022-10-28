const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const Project = require("../models/index");

const router = express.Router();

const {
  getAllProjects,
  // searchProjectsByName,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

const setUser = async (req, res, next) => {
  const auth = req.header("Autorization");

  if (!auth) {
    next();
  } else {
    const [, token] = auth.split(" ");
    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    next();
  }
};

router.get("*/", getAllProjects);
// router.get("/search", searchProjectsByName);
router.get("/:id", getProjectById);
router.post("/", setUser, createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
