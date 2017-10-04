const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoieGlmZW5namluIiwiYSI6ImNqOGJyOGtocjAweGkyd3A1ajIwOW83dTkifQ.y1WHW83UgrE6kVqAMZrkBw";

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);

const hotelsSelectElement = document.getElementById("hotels-choices");
const restaurantsSelectElement = document.getElementById("restaurants-choices");
const activitiesSelectElement = document.getElementById("activities-choices");


window.fetch("/api/attractions").then(function(res) {
  return res.json();
}).then(function(data) {
  map.flyTo({center: [-74.009, 40.705], zoom: 12});
  const hotels = data.hotels;
  const restaurants = data.restaurants;
  const activities = data.activities;
  hotels.forEach(function(hotel) {
    const option = document.createElement("option");
    option.innerHTML = hotel.name;
    hotelsSelectElement.appendChild(option);
  });
  restaurants.forEach(function(restaurant) {
    const option = document.createElement("option");
    option.innerHTML = restaurant.name;
    restaurantsSelectElement.appendChild(option);
  });
  activities.forEach(function(activity) {
    const option = document.createElement("option");
    option.innerHTML = activity.name;
    activitiesSelectElement.appendChild(option);
  });
  const hotelsAdd = document.getElementById("hotels-add");
  const restaurantsAdd = document.getElementById("restaurants-add");
  const activitiesAdd = document.getElementById("activities-add");

  hotelsAdd.addEventListener("click", function(event) {
    const hotelsList = document.getElementById("hotels-list");
    const li = document.createElement("li");
    li.innerHTML = hotelsSelectElement.value;
    hotelsList.appendChild(li);
    let marker
    hotels.forEach(function(hotel) {
      if (hotel.name === hotelsSelectElement.value) {
        marker = buildMarker("hotels",  hotel.place.location);
        map.flyTo({
          center: hotel.place.location,
          zoom: 12,
          speed: 0.4,
          curve: 1,
          easing(t) {
            return t;
          }
        });
        marker.addTo(map);
      } 
    });
    const button = document.createElement("button");
    button.setAttribute("id", "hotels-add");
    button.setAttribute("class", "options-btn");
    button.innerHTML = "X";
    hotelsList.appendChild(button);
    button.addEventListener("click", function(event) {
      hotelsList.removeChild(li);
      hotelsList.removeChild(event.target);
      marker.remove();
    })
  });
  restaurantsAdd.addEventListener("click", function(event) {
    const restaurantsList = document.getElementById("restaurants-list");
    const li = document.createElement("li");
    li.innerHTML = restaurantsSelectElement.value;
    restaurantsList.appendChild(li);
    let marker
    restaurants.forEach(function(restaurant) {
      if (restaurant.name === restaurantsSelectElement.value) {
        marker = buildMarker("restaurants",  restaurant.place.location);
        map.flyTo({
          center: restaurant.place.location,
          zoom: 12,
          speed: 0.4,
          curve: 1,
          easing(t) {
            return t;
          }
        });
        marker.addTo(map);
      } 
    });
    const button = document.createElement("button");
    button.setAttribute("id", "restaurants-add");
    button.setAttribute("class", "options-btn");
    button.innerHTML = "X";
    restaurantsList.appendChild(button);
    button.addEventListener("click", function(event) {
      restaurantsList.removeChild(li);
      restaurantsList.removeChild(event.target);
      marker.remove();
    })
  });
  activitiesAdd.addEventListener("click", function(event) {
    const activitiesList = document.getElementById("activities-list");
    const li = document.createElement("li");
    li.innerHTML = activitiesSelectElement.value;
    activitiesList.appendChild(li);
    let marker
    activities.forEach(function(activity) {
      if (activity.name === activitiesSelectElement.value) {
        marker = buildMarker("activities",  activity.place.location);
        map.flyTo({
          center: activity.place.location,
          zoom: 12,
          speed: 0.4,
          curve: 1,
          easing(t) {
            return t;
          }
        });
        marker.addTo(map);
      } 
    });
    const button = document.createElement("button");
    button.setAttribute("id", "activities-add");
    button.setAttribute("class", "options-btn");
    button.innerHTML = "X";
    activitiesList.appendChild(button);
    button.addEventListener("click", function(event) {
      activitiesList.removeChild(li);
      activitiesList.removeChild(event.target);
      marker.remove();
    })
  });
}).catch(function(err) {
  console.log(err.message);
});