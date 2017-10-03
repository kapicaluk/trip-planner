const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/trip-planner', {
    logging: false,
})

const Place = db.define('page', {

})

const Hotel = db.define('page', {
	
})

const Restaurant = db.define('page', {
	
})

const Activity = db.define('page', {
	
})

module.exports = {db, Place, Hotel, Restaurant, Activity}