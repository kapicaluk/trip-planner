
const mapboxgl = require("mapbox-gl");
const iconURLs = {
    activities: "http://i.imgur.com/WbMOfMl.png",
    hotels: "http://i.imgur.com/D9574Cu.png",
    restaurants: "http://i.imgur.com/cqR6pUI.png"
};

const buildMarker = (type, coords) => {
  const markerDomEl = document.createElement("div"); // Create a new, detached DIV
  markerDomEl.style.width = "32px";
  markerDomEl.style.height = "39px";
  markerDomEl.style.backgroundImage = `url(${iconURLs[type]})`;
  new mapboxgl.Marker(markerDomEl).setLngLat(coords);
}

module.exports = buildMarker;
