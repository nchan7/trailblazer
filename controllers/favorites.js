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
  db.user.findOne({
    where: {id: parseInt(req.user.id)},
    include: [db.trail]
  }).then(function(user) {
    res.render("favorites/index", {user});
  });
  // TODO: Get all records from the DB and render to view
  
});


// router.get('/', function(req, res) { // appends to the first parameter in the index.js file
//   db.trail.findAll().then(function(trails) {
//     res.render("favorites/index", {trails});
//   });
//   // TODO: Get all records from the DB and render to view
  
// });

// POST /trail - receive the name of a trail and add it to the database
router.post('/', function(req, res) { // appends to the first parameter in the index.js file
  db.user.findByPk(parseInt(req.user.id)).then( function (user) {
    user.createTrail({
      name: req.body.name,
      lat: req.body.lat,
      lon: req.body.lon,
      number: req.body.number
    }).then(function(data) {
      res.redirect('/trail/favorites');
    });
  })

  // db.trail.create({
  //   name: req.body.name,
  //   lat: req.body.lat,
  //   lon: req.body.lon,
  //   number: req.body.number
  // }).then(function(data) {
  //   res.redirect('/trail/favorites');
  // });
  // TODO: Get form data and add a new record to DB
  
});








// GET /trail/:number - Gets one trail id from the database
// and uses it to look up details about that one trail
router.get("/:number", function(req, res) {
  var trailUrl = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + req.params.number + '&key=' + process.env.HIKING_PROJECT_API;
  // Use request to call the API
  axios.get(trailUrl).then( function(apiResponse) {
      let trailDetails = apiResponse.data;
      db.trail.findOne({
        where: {number: parseInt(req.params.number)},
        include: [db.comment, db.user]
      }).then(function(trail) {
        res.render('favorites/show', { trail, trailDetails });
      })

    })
  

});

// GET /trail/:number - Gets one trail id from the database and returns show page
//TODO: Keep DARK SKY API HERE
// router.get('/:number', function(req, res) {
//   // TODO: Look up trail in our db by its trail ID which is in the number column (findOne)
//     var trailUrl = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + req.params.number + '&key=' + process.env.HIKING_PROJECT_API;
//     axios.get(trailUrl).then( function(apiResponse) {
//         let trailDetails = apiResponse.data;
//         let weatherRequest = trailDetails.trails.map( function (trail) {
//             return function(callback) {
//                 let weatherUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API + '/' + trail.latitude + ',' + trail.longitude;
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
//         res.render('favorites/show', { trailDetails, results });
//     })
//     })  
      
    
// });


router.delete('/:number', function(req, res) {
  db.trail.destroy ({
    where: {number: req.params.number}
    }).then(function(trail) {
    res.redirect('/trail/favorites'); 
  });
});

// PUT /pokemon/:id
// router.put("/:id")
router.post("/:number/comments", function(req, res) { // wouldn't just post to :id because it wouldn't be a restful route
    db.trail.findOne({
      where: {number: parseInt(req.params.number)}
     // either this way or (see below uncommented) // more secure since sequelize takes care of the relations
    }).then(function(trail) {
        trail.createComment({
            userId: req.user.id,
            name: req.user.name,
            comment: req.body.comment
        }).then(function(comment) {
            res.redirect("/trail/favorites/" + req.params.number) 
        });
    });
});



module.exports = router;
