console.log("Hello Mapbox!");
console.log(markerCoords);

mapboxgl.accessToken = "pk.eyJ1IjoibmNoYW43IiwiYSI6ImNqeGMxbXh3YTAwN3Ezb3A5Z2NiZ3d0bjYifQ.xBExfV164J2TU9NPnYXO2g";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: markerCoords[0],
    zoom: 9
})

const geoJson = {
    "type": "FeatureCollection",
    "features": markerCoords.map( function(coord) {
        let marker = {
            "type": "Feature",
            "properties": {
                "iconSize": [60, 60]
            }, 
            "geometry": {
                "type": "Point",
                "coordinates": coord
            }
        }
        return marker
    })
}

geoJson.features.forEach(function (feature) {
    new mapboxgl.Marker({anchor: "center"})
        .setLngLat(feature.geometry.coordinates)
        .addTo(map)
});

// For 3D Buildings
// map.on('load', function () {
// 	let layers = map.getStyle().layers;
// 	let labelLayerId;
// 	for (let i = 0; i < layers.length; i++) {
// 		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
// 			labelLayerId = layers[i].id;
// 			break;
// 		}
// 	}
// 	map.addLayer({
// 		"id": "3d-buildings",
// 		"source": "composite",
// 		"source-layer": "building",
// 		"filter": ["==", "extrude", "true"],
// 		"type": "fill-extrusion",
// 		"minzoom": 12,
// 		"paint": {
// 			"fill-extrusion-color": "#009e60",
// 			"fill-extrusion-height": [
// 				"interpolate",
// 				["linear"],
// 				["zoom"],
// 				12,
// 				0,
// 				12.05,
// 				["get", "height"]
// 			],
// 			"fill-extrusion-base": [
// 				"interpolate",
// 				["linear"],
// 				["zoom"],
// 				12,
// 				0,
// 				12.05,
// 				["get", "min_height"]
// 			],
// 			"fill-extrusion-opacity": 0.6
// 		}
// 	}, labelLayerId)
// });