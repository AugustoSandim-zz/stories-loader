var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/apiRouter");

// firebase
var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
// Initialize Firebase for the application
var config = {
  apiKey: "AIzaSyDF1M64jgOC4gLm-pI3NqrHxkHRH6wHG28",
  authDomain: "stories-loader-257604.firebaseapp.com",
  databaseURL: "https://stories-loader-257604.firebaseio.com",
  projectId: "stories-loader-257604",
  storageBucket: "stories-loader-257604.appspot.com",
  messagingSenderId: "40159847187",
  appId: "1:40159847187:web:4aa05005537c85689bf0e6"
};

var app = express();
firebase.initializeApp(config);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "assets")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
