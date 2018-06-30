// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var cars_list = [
  {
    brand: "Ford",
    model: "Mustang",
    year: 2000
  },
  {
    brand: "Nissan",
    model: "Maxima",
    year: 2017
  },
  {
    brand: "Toyota",
    model: "Cambry",
    year: 2018
  },
  {
    brand: "Honda",
    model: "Civic",
    year: 2015
  },
  {
    brand: "Honda",
    model: "Pilot",
    year: 2014
  },
  {
    brand: "Ford",
    model: "F-150",
    year: 2018
  },
  {
    brand: "Jeep",
    model: "Wrangler",
    year: 2016
  }
];

db.Car.remove({}, function(err, cars){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all cars');

    db.Car.create(cars_list, function(err, cars){
      if (err) { return console.log('err', err); }
      console.log("created", cars.length, "cars");
      process.exit();
    });
  }
});
