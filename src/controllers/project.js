const sequelize = require("../db");
const Project = require("../models/project");
const debug = require("debug")("app:controllers");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

/**
 * @desc Gets all projects
 * @route GET /api/project
 * @access Public
 */
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();

    if (!projects) {
      res.status(400).json({
        success: false,
        message: "No projects found",
      });
    } else {
      res
        .status(200)
        .json({ projects, success: true, message: "All projects returned" });
    }
  } catch (error) {
    debug(error);
    res
      .status(400)
      .json({ success: false, message: ` - Error: ${error.message}` });
  }
};

/**
 * @desc Get single project by id
 * @route GET api/project/:id
 * @access Public
 */
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      res.status(400).json({
        success: false,
        message: "project not found - check the project ID",
      });
    } else {
      res.status(200).json({
        project,
        success: true,
        message: "project returned successfully",
      });
    }
  } catch (error) {
    debug(error);
    res.status(400).json({
      success: false,
      message: `project not found - Error: ${error.message}`,
    });
  }
};

/**
 * @desc Create single project
 * @route POST api/project/create
 * @access Private
 */
exports.createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    try {
      const newProject = req.body;
      const createdProject = await Project.create(newProject);
      res.status(200).json({
        createdProject,
        success: true,
        message: "Project successfully created",
      });
    } catch (error) {
      debug(error);
      res.status(400).json({
        success: false,
        message: `Project not created - Error: ${error.message}`,
      });
    }
  }
};

/**
 * @desc Update single project by ID
 * @route PUT api/project/update/:id
 * @access Private
 */
exports.updateProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    const projectId = req.params.id;
    const updates = req.body;

    try {
      const projectToUpdate = await Project.findByPk(projectId);

      const updatedProject = await projectToUpdate.update(updates);

      res.status(200).json({
        updatedProject,
        success: true,
        message: "Project updated successfully!",
      });
    } catch (error) {
      debug(error);
      res.status(400).json({
        success: false,
        message: `Unable to update - Error: ${error.message}`,
      });
    }
  }
};

/**
 * @desc Delete single project by id
 * @route DELETE api/project/delete/:id
 * @access Private
 */
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const projectToDelete = await Project.findByPk(projectId);
    const deletedProject = await projectToDelete.destroy();

    res.status(200).json({
      deletedProject,
      success: true,
      message: "Project successfully deleted",
    });
  } catch (error) {
    debug("Error: ", error);
    res.status(400).json({
      success: false,
      message: `Unable to delete - Error: ${error.message}`,
    });
  }
};
