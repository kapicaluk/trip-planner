const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');


const app = express();

const db = require("../models").db;
const Hotel = require("../models").Hotel;
const Restaurant = require("../models").Restaurant;
const Activity = require("../models").Activity;
const Place = require("../models").Place;

app.use(express.static(path.join(__dirname, '..', 'public')))


// logging and body-parsing
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/attractions", function(req, res, next) {
  const hotels = Hotel.findAll({
    include: [{
      model: Place
    }]
  }).then(hotels => {
    return hotels;
  });

  const restaurants = Restaurant.findAll({
    include: [{
      model: Place
    }]
  }).then(restaurants => {
    return restaurants;
  });

  const activities = Activity.findAll({
    include: [{
      model: Place
    }]
  }).then(activities => {
    return activities;
  });

  Promise.all([hotels, restaurants, activities]).then(([hotels, restaurants, activities]) =>{
    res.json({
      hotels,
      restaurants,
      activities
    });
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
  res.send(err.message);
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
  return Place.sync();
  
}).then(function() {
  app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
  });
})

