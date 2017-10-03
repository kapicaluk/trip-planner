const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/trip-planner', {
    logging: false,
})

const Place = db.define('page', {
    address: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
    }
})

const Hotel = db.define('page', {
  name: {
      type: Sequelize.STRING
  },
  num_stars: {
      type: Sequelize.FLOAT
  },
  amenities: {
      type: Sequelize.STRING
  }
})

const Restaurant = db.define('page', {
	name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    cuisine: {
        type: Sequelize.INTEGER
    }
});

const Activity = db.define('page', {
	name: {
        type: Sequelize.STRING
    },
    age_range: {
        type: Sequelize.STRING
    }
});

Place.belongsTo(Hotel);
Place.belongsTo(Restaurant);
Place.belongsTo(Activity);

module.exports = {db, Place, Hotel, Restaurant, Activity}