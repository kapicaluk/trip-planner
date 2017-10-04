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
    const button = document.createElement("button");
    button.setAttribute("id", "hotels-add");
    button.setAttribute("class", "options-btn");
    button.innerHTML = "X";
    hotelsList.appendChild(button);
    button.addEventListener("click", function(event) {
      hotelsList.removeChild(li);
      hotelsList.removeChild(event.target);
    })
  });
  restaurantsAdd.addEventListener("click", function(event) {
    const restaurantsList = document.getElementById("restaurants-list");
    const li = document.createElement("li");
    li.innerHTML = restaurantsSelectElement.value;
    restaurantsList.appendChild(li);
    const button = document.createElement("button");
    button.setAttribute("id", "restaurants-add");
    button.setAttribute("class", "options-btn");
    button.innerHTML = "X";
    restaurantsList.appendChild(button);
    button.addEventListener("click", function(event) {
      restaurantsList.removeChild(li);
      restaurantsList.removeChild(event.target);
    })
  });
  activitiesAdd.addEventListener("click", function(event) {
    const activitiesList = document.getElementById("activities-list");
    const li = document.createElement("li");
    li.innerHTML = activitiesSelectElement.value;
    activitiesList.appendChild(li);
    const button = document.createElement("button");
    button.setAttribute("id", "activities-add");
    button.setAttribute("class", "options-btn");
    button.innerHTML = "X";
    activitiesList.appendChild(button);
    button.addEventListener("click", function(event) {
      activitiesList.removeChild(li);
      activitiesList.removeChild(event.target);
    })
  });
}).catch(function(err) {
  console.log(err.message);
});