// car.js
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CarSchema = new Schema({
  brand: String,
  model: String,
  year: Number
});

var Car = mongoose.model('Car', CarSchema);

module.exports = Car;
