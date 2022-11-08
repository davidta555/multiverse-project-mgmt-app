const express = require("express");
const setUser = require("../middleware/setUser");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

const {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} = require("../controllers/issue");

router.get("/", setUser, getAllIssues);
router.get("/:id", setUser, getIssueById);
router.post("/", setUser, createIssue);
router.put("/:id", setUser, isAdmin, updateIssue);
router.delete("/:id", setUser, isAdmin, deleteIssue);

module.exports = router;
