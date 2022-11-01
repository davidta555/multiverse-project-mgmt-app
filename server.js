const cors = require("cors");
const express = require("express");
const path = require("path");
const debug = require("debug")("app:server");
const sequelize = require("./src/db");
const morgan = require("morgan");
const { auth } = require("express-openid-connect");

//import routes
const userRoute = require("./src/routes/user.js");
const projectRoute = require("./src/routes/project.js");
const issueRoute = require("./src/routes/issue.js");

//check database connection
sequelize
  .authenticate()
  .then((res) => debug("Database is connected"))
  .catch((err) => {
    debug("There was an error connecting to the database", err);
    process.exit(1); //NODE TERMINATE SERVER
  });

//middleware
// require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_BASE_URL } =
  process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_AUDIENCE,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_URL,
};

app.use(auth(config));

// if (process.env.MODE) {
//   app.use(morgan("dev"));
// }

app.use(express.static(path.join(__dirname, "src", "public"))); //public
app.use(express.json()); //server can speak in .json

//ROUTES
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/issue", issueRoute);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  debug(`Server is up and running on PORT: ${PORT}`);
});
