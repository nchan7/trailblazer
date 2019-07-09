require('dotenv').config();
const express = require('express');
const db = require('../models');
const axios = require('axios'); 
const async = require('async');
const router = express.Router();

//Geocoding Setup
const mapbox = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mapbox({
    accessToken: process.env.MAPBOX_PUBLIC_KEY
});

// router.get("/", function(req, res) {
//     let location = req.query.location; 
//     // Seattle, WA
//     // use geocoder to query the location with sushi appended to the query
//     // then take response from mapbox and render "show" with the data
//     geocodingClient.forwardGeocode({
//     query: location
//     }).send().then( function(response) {
//         console.log(response.body.features[0].center);
//         // let results = response.body.features.map( function(feature) {
//         //     console.log(feature.center);
//         //     return feature.center
//         // });
//         // res.render("map", {results}); 
//     })
//   });

//* Pulling API data - Hiking Project API
router.get("/", function(req, res) {
    let location = req.query.location; 
    // Seattle, WA
    // use geocoder to query the location with sushi appended to the query
    // then take response from mapbox and render "show" with the data
    geocodingClient.forwardGeocode({
    query: location
    }).send().then( function(response) {   
        var lat = response.body.features[0].center[1];
        var lon = response.body.features[0].center[0];
        var trailUrl = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxDistance=50&maxResults=20&key=' + process.env.HIKING_PROJECT_API;
        // Use request to call the API
        axios.get(trailUrl).then( function(apiResponse) {
            let trails = apiResponse.data;
            let trailsMap = apiResponse.data.trails.map(function(trail){
                return [parseFloat(trail.longitude), parseFloat(trail.latitude)];
            });
            // res.json(trails);
            // res.json(trailsMap);


            res.render('trail/index', { trails, trailsMap});
        })
    

    });

});

router.get("/:number", function(req, res) {
    var trailUrl = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + req.params.number + '&key=' + process.env.HIKING_PROJECT_API;
    let similarLengthDetails = null;
    let similarAscentDetails = null;
    // res.json(trailDetails);
    
    // Use request to call the API
    axios.get(trailUrl).then( function(apiResponse) {
      let trailDetails = apiResponse.data;
      let trailRating = apiResponse.data.trails[0].stars;
      let trailAscent = apiResponse.data.trails[0].ascent;
      let trailLength = apiResponse.data.trails[0].length;
      let trailLat = apiResponse.data.trails[0].latitude;
      let trailLng = apiResponse.data.trails[0].longitude;
      db.trail.findOne({
        where: {number: parseInt(req.params.number)},
      }).then(function(trail) {
        var searchUrl = 'https://www.hikingproject.com/data/get-trails?lat='+trailLat+'&lon='+trailLng+'&maxDistance=10&maxResults=20&key='+ process.env.HIKING_PROJECT_API;
        axios.get(searchUrl).then( function(apiResponse) {
          let lengthDifference = [];
          let ascentDifference = [];
          apiResponse.data.trails.forEach(function(trail) {
            lengthDifference.push(Math.abs(trailLength - trail.length));
            ascentDifference.push(Math.abs(trailAscent - trail.ascent));
          })
          let indexLength = lengthDifference.indexOf(Math.min.apply(null, lengthDifference.filter(Boolean))); // Stack overflow
          let indexAscent = ascentDifference.indexOf(Math.min.apply(null, ascentDifference.filter(Boolean))); // Stack overflow
          // Source Code: https://stackoverflow.com/questions/10557176/minimum-number-excluding-zero
          similarLengthDetails = apiResponse.data.trails[indexLength];
          similarAscentDetails = apiResponse.data.trails[indexAscent];
           if(req.user) {
             res.render('favorites/show', { trail, trailDetails, similarLengthDetails, similarAscentDetails });
            } else {
            res.render('trail/show', { trail, trailDetails });
            }
         }).catch(function(error) {
          console.log(error);
    
        })
        })

    
    })
});


module.exports = router; 