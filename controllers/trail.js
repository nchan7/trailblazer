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

//* Pulling API data - Hiking Project API
// router.get("/", function(req, res) {
//     var lat = 47.6853
//     var lon = -122.2994
//     var trailUrl = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxDistance=50&maxResults=20&key=' + process.env.HIKING_PROJECT_API;
//     // Use request to call the API
//     axios.get(trailUrl).then( function(apiResponse) {
//         let trails = apiResponse.data;
//         res.render('trail/index', { trails });
//     })
    

// });



router.get("/", function(req, res) {
    // var coords = [];
    // let location = req.query.city + ", " + req.query.state; 
    // // Seattle, WA
    // // use geocoder to query the location with sushi appended to the query
    // // then take response from mapbox and render "show" with the data
    // geocodingClient.forwardGeocode({
    // query: location
    // }).send().then( function(response) {
    //     coords = response.body.features.map( function(feature) {
    //         return feature.center
    //     });
    //     // res.render("map", {results}); 
    // })
    // var lat = coords[1];
    // var lon = coords[0];
    var lat = 47.685058;
    var lon = -122.299247;
    var trailUrl = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxDistance=50&maxResults=20&key=' + process.env.HIKING_PROJECT_API;
    // Use request to call the API
    axios.get(trailUrl).then( function(apiResponse) {
        let trails = apiResponse.data;
        // console.log(trails)
        let weatherRequest = trails.trails.map( function (trail) {
            return function(callback) {
                let weatherUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API + '/'+ trail.latitude + ',' + trail.longitude;
                axios.get(weatherUrl).then( function (results) {
                    let name = trail.name;
                    let weather = results.data.daily.data.map( function(temp) {
                        return temp.temperatureMax;
                    })
                    callback(null, {trail: name, weather})
                })
            }
        })
        
        async.parallel(async.reflectAll(weatherRequest), function(err, results) {
            
            // res.json(results)
            res.render('trail/index', { trails, results });
        })
    })
    

});

module.exports = router; 


// axios.get(apiURL + 'users').then( function(results) {
//     let userData = results.data; 
//     // console.log(userData);
//     let albumRequests = userData.map( function(user) {
//       return function(callback) {
//         let albumsURL = apiURL + 'albums?userId=' + user.id;
//         axios.get(albumsURL).then( function(results) {
//           let name = user.name;
//           let albums = results.data.map (function(album) {
//             return album.title
//           })
//           callback(null, {name: name, albums: albums})
//         })
//       }
//     })
//       async.parallel(async.reflectAll(albumRequests), function(err, results) {
//         console.log(results); 
//       })
    
//   });