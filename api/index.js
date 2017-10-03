var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;

module.exports = router;

router.get('/', (req, res, next) => {
    var allAttractions = {};

    Hotel.findAll()
        .then(function(hotels) {
            allAttractions.hotels = hotels;
            return Restaurant.findAll();
        })
        .then(function(restaurants) {
            allAttractions.restaurants = restaurants;
            return Activity.findAll();
        })
        .then(function(activities) {
            allAttractions.activities = activities;
        })
        .then(function() {
            res.json(allAttractions);
        })
        .catch(next);
})