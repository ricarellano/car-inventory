var mongoose = require("mongoose");

// use native JS promise library instead of Mongoose's deprecated one
mongoose.Promise = global.Promise;

// connect to the localhost car-app database
mongoose.connect("mongodb://localhost/car-app");

// models/index.js
module.exports.Car = require("./car.js");
