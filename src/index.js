const buildMarker = require("./marker");
const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken = "pk.eyJ1IjoiY2Fzc2lvemVuIi...A4dGQyNnN1ZifQ.0ZIRDup0jnyUFVzUa_5d1g";
const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available
});

const marker = buildMarker("activities", [-74.009151, 40.705086]);
console.log(marker);
marker.addTo(map);
