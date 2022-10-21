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

router.get("*/", getAllIssues);
router.get("/search", searchIssuesByName);
router.get("/:id", getIssueById);
router.post("/", setUser, createIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

module.exports = router;
