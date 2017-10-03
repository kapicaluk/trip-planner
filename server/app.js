const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');


const app = express();

const db = require("../models").db;
const Hotel = require("../models").Hotel;
const Restaurant = require("../models").Restaurant;
const Activity = require("../models").Activity;

app.use(express.static(path.join(__dirname, '..', 'public')))


// logging and body-parsing
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", function(req, res, next) {
  const hotels = Hotel.findAll({}).then(hotels => {
    return hotels;
  });

  const restaurants = Restaurant.findAll({}).then(restaurants => {
    return restaurants;
  });

  const activities = Activity.findAll({}).then(activities => {
    return activities;
  });

  Promise.all([hotels, restaurants, activities]).then((...actractions) =>{
    res.json(actractions);
  }).catch(next);

})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error();
  res.send("go to hell");
});


// listen on a port
var port = 3000;

Hotel.sync()
.then(function () {
    return Restaurant.sync();
})
.then(function () {
    return Activity.sync();
}).then(function() {
  app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
  });
})

