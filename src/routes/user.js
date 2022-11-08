const express = require("express");
const setUser = require("../middleware/setUser");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("/", setUser, isAdmin, getAllUsers);
router.get("/:id", getUserById);
router.get("/me", setUser, getCurrentUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", setUser, isAdmin, updateUser);
router.delete("/:id", setUser, isAdmin, deleteUser);

module.exports = router;
