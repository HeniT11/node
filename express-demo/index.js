const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./middleware/logger");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

console.log("App name: " + config.get("name"));
console.log("mail server: " + config.get("mail.host"));
console.log("mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgen enabled");
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
