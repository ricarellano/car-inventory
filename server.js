// server.js

var db = require('./models')
var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


var newCarUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all cars
app.get('/api/cars', function (req, res) {
  // send all cars as JSON response
  db.Car.find(function(err, cars){
    if (err) { return console.log("index error: " + err); }
    res.json(cars);
  });
});

// get one car
app.get('/api/cars/:id', function(req, res) {
  // get todo id from url params (`req.params`)
  var carId = req.params.id;

  // find todo in db by id
  db.Car.findOne({ _id: carId }, function(err, foundCar) {
    res.json(foundCar);
  });
});


// create new car
app.post('/api/cars', function(req, res) {
   // create new todo with form data (`req.body`)
   var newCar = new db.Car(req.body);

   // save new todo in db
   newCar.save(function(err, savedCar) {
     res.json(savedCar);
   });
 });


// update car
app.put('/api/cars/:id', function(req, res) {
  // get todo id from url params (`req.params`)
  var carId = req.params.id;

  // find todo in db by id
  db.Car.findOne({ _id: carId }, function(err, foundCar) {
    // update the todos's attributes
    foundCar.brand = req.body.brand;
    foundCar.model = req.body.model;
    foundCar.year = req.body.year;

    // save updated todo in db
    foundCar.save(function(err, savedCar) {
      res.json(savedCar);
    });
  });
});


// delete car
app.delete('/api/cars/:id', function(req, res) {
   // get todo id from url params (`req.params`)
   var carId = req.params.id;

   // find todo in db by id and remove
   db.Car.findOneAndRemove({ _id: carId }, function(err, deletedCar) {
     res.json(deletedCar);
   });
 });






app.listen(process.env.PORT || 3000, function () {
  console.log('Car app listening at http://localhost:3000/');
});
