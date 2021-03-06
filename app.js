require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

require("./config/cloudinary");

const session = require("express-session");
const passport = require("passport");

require("./config/passport");

mongoose.Promise = Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://predictiveinjuryapp.herokuapp.com"
  })
);

// app.use((req, res, next) => {
//   // If no routes match, send them the React HTML.
//   res.sendFile(__dirname + "/public/index.html");
// });

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

// Express View engine setup

// app.use(
//   require("node-sass-middleware")({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//     sourceMap: true
//   })
// );

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
// app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5000",
      "http://predictiveinjuryapp.herokuapp.com"
    ]
  })
);

const index = require("./routes/api");
app.use("/", index);

const userCrudRoutes = require("./routes/api/CRUDRoutes/userCrud");
app.use("/api", userCrudRoutes);

const medicalForms = require("./routes/api/CRUDRoutes/medicalForms");
app.use("/api", medicalForms);

const athleteProfile = require("./routes/api/CRUDRoutes/athleteProfileCrud");
app.use("/api", athleteProfile);

const authRoutes = require("./routes/api/auth-routes");
app.use("/api", authRoutes);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
