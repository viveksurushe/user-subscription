const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser= require('body-parser')
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 3000;

const usersRouter = require("./modules/user/user.controller");
const subscriptionRouter = require("./modules/subscription/subscription.controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/user", usersRouter);
app.use("/subscription", subscriptionRouter);
app.use("/", (req, res) => {
  return res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  mongoose.connect("mongodb://127.0.0.1:27017/wishup", {
    useNewUrlParser: true
  });
});

/**
 * database connection settings
 */
mongoose.connection.on("error", function (err) {
  console.log("database connection error");
  console.log(err);
}); // end mongoose connection error

mongoose.connection.on("open", function (err) {
  if (err) {
    console.log("database error");
    console.log(err);
  } else {
    console.log("database connection open success");
  }
}); // enr mongoose connection open handler

module.exports = app;
