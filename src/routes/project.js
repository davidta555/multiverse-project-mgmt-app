const express = require("express");
const setUser = require("../middleware/setUser");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

router.get("/", setUser, getAllProjects);
router.get("/:id", setUser, getProjectById);
router.post("/", setUser, createProject);
router.put("/:id", setUser, isAdmin, updateProject);
router.delete("/:id", setUser, isAdmin, deleteProject);

module.exports = router;
