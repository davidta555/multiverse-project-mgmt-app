const sequelize = require("../db");
const User = require("../models/user");
const debug = require("debug")("app:controllers");
const { validationResult } = require("express-validator");

/**
 * @desc Gets all users
 * @route GET /api/user
 * @access Public
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      res.status(400).json({
        success: false,
        message: "No users found",
      });
    } else {
      res
        .status(200)
        .json({ users, success: true, message: "All users returned" });
      res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
    }
  } catch (error) {
    debug(error);
    res
      .status(400)
      .json({ success: false, message: ` - Error: ${error.message}` });
  }
};

/**
 * @desc Get single user by id
 * @route GET api/user/:id
 * @access Public
 */
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found - check the user ID",
      });
    } else {
      res.status(200).json({
        user,
        success: true,
        message: "User returned successfully",
      });
    }
  } catch (error) {
    debug(error);
    res.status(400).json({
      success: false,
      message: `User not found - Error: ${error.message}`,
    });
  }
};

/**
 * @desc Get current user
 * @route GET /api/me
 * @access Public
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.oidc.user.username, raw: true },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1w" });

      res.send({ user, token });
    }
  } catch (error) {
    debug(error);
    res.status(400).json({
      success: false,
      message: `User not found - Error: ${error.message}`,
    });
  }
};

// /**
//  * @desc Create single user
//  * @route POST api/user/create
//  * @access Private
//  */
// exports.createUser = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//   } else {
//     try {
//       const newUser = req.body;
//       const createdUser = await User.create(newUser);
//       res.status(200).json({
//         createdUser,
//         success: true,
//         message: "User successfully created",
//       });
//     } catch (error) {
//       debug(error);
//       res.status(400).json({
//         success: false,
//         message: `User not created - Error: ${error.message}`,
//       });
//     }
//   }
// };

/**
 * @desc Register single user
 * @route POST api/user/login
 * @access Public
 */
exports.registerUser = async (req, res) => {
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    try {
      const { username, password } = req.body;
      const hashedPw = await bcrypt.hash(password, SALT_COUNT);

      const newUser = await User.create({ username, password: hashedPw });

      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        JWT_SECRET
      );
      res.send({ message: "success", token });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `User not registered - Error: ${error.message}`,
      });
    }
  }
};

/**
 * @desc Register single user
 * @route POST api/user/login
 * @access Public
 */
exports.loginUser = async (req, res) => {
  if (!error.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const { id, username } = user;
        const token = jwt.sign({ id, username }, JWT_SECRET);
        res.send({ message: "success", token });
      } else {
        res.sendStatus(401).send("user not found");
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `Could not login user - Error: ${error.message}`,
      });
    }
  }
};

/**
 * @desc Update single user by ID
 * @route PUT api/user/update/:id
 * @access Private
 */
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, error: errors.array() });
  } else {
    const userId = req.params.id;
    const updates = req.body;

    try {
      const userToUpdate = await User.findByPk(userId);

      const updatedUser = await userToUpdate.update(updates);

      res.status(200).json({
        updatedUser,
        success: true,
        message: "User updated successfully!",
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
 * @desc Delete single user by id
 * @route DELETE api/user/delete/:id
 * @access Private
 */
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const userToDelete = await User.findByPk(userId);
    const deletedUser = await userToDelete.destroy();

    res.status(200).json({
      deletedUser,
      success: true,
      message: "User successfully deleted",
    });
  } catch (error) {
    debug("Error: ", error);
    res.status(400).json({
      success: false,
      message: `Unable to delete - Error: ${error.message}`,
    });
  }
};
