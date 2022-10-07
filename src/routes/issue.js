const express = require("express");
const debug = require("debug")("app:routes");

const sequelize = require("../db");
const Issue = require("../models/index");

const router = express.Router();

const {
  getAllIssues,
  searchIssuesByName,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} = require("../controllers/issue");

router.get("*/", getAllIssues);
router.get("/search", searchIssuesByName);
router.get("/:id", getIssueById);
router.post("/", createIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

module.exports = router;
