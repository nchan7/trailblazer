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

// GET /trail - return a page with favorited Trails
router.get('/', function(req, res) { // appends to the first parameter in the index.js file
  db.trail.findAll().then(function(trails) {
    res.render("favorites/index", {trails});
  });
  // TODO: Get all records from the DB and render to view
  
});

// POST /trail - receive the name of a trail and add it to the database
router.post('/', function(req, res) { // appends to the first parameter in the index.js file
  db.trail.create({
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    number: req.body.number
  }).then(function(data) {
    res.redirect('/trail/favorites');
  });
  // TODO: Get form data and add a new record to DB
  
});


// Get /trail/:number - Gets one trail id from the database
// and uses it to look up details about that one trail
router.get("/:number", function(req, res) {
  var trailUrl = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + req.params.number + '&key=' + process.env.HIKING_PROJECT_API;
  // Use request to call the API
  axios.get(trailUrl).then( function(apiResponse) {
      let trailDetails = apiResponse.data;
      res.render('favorites/show', { trail: trailDetails });
  })
  

});

//TODO: Keep DARK SKY API HERE
// router.get('/:number', function(req, res) {
//   // TODO: Look up trail in our db by its trail ID which is in the number column (findOne)

//     axios.get()
//     .then( function(apiResponse) {
//         var trailDetails = apiResponse.data;
//         let weatherRequest = trailDetails.trails.map( function (trail) {
//             return function(callback) {
//                 let weatherUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API + '/'+ trail.latitude + ',' + trail.longitude;
//                 axios.get(weatherUrl).then( function (results) {
//                     let name = trail.name;
//                     let weather = results.data.daily.data.map( function(temp) {
//                         return temp.temperatureMax;
//                     })
//                     callback(null, {trail: name, weather})
//                 })
//             }
//         })
    
//     async.parallel(async.reflectAll(weatherRequest), function(err, results) {
        
//         // res.json(results)
//         res.render('/trail/favorites/show', { trail: trailDetails, results });
//     })
//     })  
      
    
// });
// });
  
 
  // Use the pokemon name from the db to query the api (axios) for details on that one pokemon 
  // Take data from the api and render a details/show page for this one pokemon
  // res.send('This is the route for showing one pokemon');
// });

router.delete('/:name', function(req, res) {
  db.trail.destroy ({
    where: {name: req.params.name}
    }).then(function(trail) {
    res.redirect('/trail/favorites'); 
  });
});

// PUT /pokemon/:id
// router.put("/:id")

module.exports = router;
