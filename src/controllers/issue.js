const sequelize = require("../db");
const Issue = require("../models/issue");
const debug = require("debug")("app:controllers");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

/**
 * @desc Gets all issues
 * @route GET /api/issue
 * @access Public
 */
exports.getAllIssues = async (req, res) => {
  if (!req.user) {
    res.status(401);
  } else {
    try {
      const issues = await Issue.findAll();

      if (!issues) {
        res.status(400).json({
          success: false,
          message: "No issues found",
        });
      } else {
        res
          .status(200)
          .json({ issues, success: true, message: "All issues returned" });
      }
    } catch (error) {
      debug(error);
      res
        .status(400)
        .json({ success: false, message: ` - Error: ${error.message}` });
    }
  }
};

/**
 * @desc Get single issue by id
 * @route GET api/issue/:id
 * @access Public
 */
exports.getIssueById = async (req, res) => {
  const issueId = req.params.id;

  try {
    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      res.status(400).json({
        success: false,
        message: "issue not found - check the issue ID",
      });
    } else {
      res.status(200).json({
        issue,
        success: true,
        message: "issue returned successfully",
      });
    }
  } catch (error) {
    debug(error);
    res.status(400).json({
      success: false,
      message: `issue not found - Error: ${error.message}`,
    });
  }
};

/**
 * @desc Create single issue
 * @route POST api/issue/create
 * @access Private
 */
exports.createIssue = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    try {
      const newIssue = req.body;
      const createdIssue = await Issue.create(newIssue);
      res.status(200).json({
        createdIssue,
        success: true,
        message: "Issue successfully created",
      });
    } catch (error) {
      debug(error);
      res.status(400).json({
        success: false,
        message: `Issue not created - Error: ${error.message}`,
      });
    }
  }
};

/**
 * @desc Update single issue by ID
 * @route PUT api/issue/update/:id
 * @access Private
 */
exports.updateIssue = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    const issueId = req.params.id;
    const updates = req.body;

    try {
      const issueToUpdate = await Issue.findByPk(issueId);

      const updatedIssue = await issueToUpdate.update(updates);

      res.status(200).json({
        updatedIssue,
        success: true,
        message: "Issue updated successfully!",
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
 * @desc Delete single issue by id
 * @route DELETE api/issue/delete/:id
 * @access Private
 */
exports.deleteIssue = async (req, res) => {
  const issueId = req.params.id;

  try {
    const issueToDelete = await Issue.findByPk(issueId);
    const deletedIssue = await issueToDelete.destroy();

    res.status(200).json({
      deletedIssue,
      success: true,
      message: "Issue successfully deleted",
    });
  } catch (error) {
    debug("Error: ", error);
    res.status(400).json({
      success: false,
      message: `Unable to delete - Error: ${error.message}`,
    });
  }
};
