const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const setUser = async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    res.status(401).json({ message: "Not authorized to access route" });
  } else {
    try {
      const [, token] = auth.split(" ");
      const user = jwt.verify(token, JWT_SECRET);
      if (!user) {
        res.status(500).json({ message: "Error in Authorization" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  }
};

module.exports = setUser;
