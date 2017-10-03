const buildMarker = require("./marker");
const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken = "pk.eyJ1IjoieGlmZW5namluIiwiYSI6ImNqOGJyOGtocjAweGkyd3A1ajIwOW83dTkifQ.y1WHW83UgrE6kVqAMZrkBw";
const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available
});

const marker = buildMarker("hotels", [-74.009151, 40.705086]);
marker.addTo(map);
