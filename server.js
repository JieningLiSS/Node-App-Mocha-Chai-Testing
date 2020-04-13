const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.mongoURI[app.settings.env], {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to EasyNotes application.",
  });
});

const noteRoute = require("./app/routes/note.routes.js");
app.use("/", noteRoute);

// listen for requests and export for test script since "server" is required in test file

module.exports = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
