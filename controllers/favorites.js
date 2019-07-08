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

// GET / - return a page with favorited Trails
router.get('/', function(req, res) { // appends to the first parameter in the index.js file
  db.user.findOne({
    where: {id: parseInt(req.user.id)},
    include: [db.trail]
  }).then(function(user) {
    res.render("favorites/index", {user});
  }).catch(function(error) {
    console.log(error);
  }) 
  // TODO: Get all records from the DB and render to view
  
});


// router.get('/', function(req, res) { // appends to the first parameter in the index.js file
//   db.trail.findAll().then(function(trails) {
//     res.render("favorites/index", {trails});
//   });
//   // TODO: Get all records from the DB and render to view
  
// });

//! THIS NEEDS TO BE A FIND OR CREATE
// POST / - receive the name of a trail and add it to the database
router.post('/', function(req, res) { // appends to the first parameter in the index.js file
  db.user.findByPk(parseInt(req.user.id)).then( function (user) {
    db.trail.findOrCreate({
      where: {name: req.body.name,
              lat: req.body.lat,
              lon: req.body.lon,
              number: req.body.number}
    }).spread(function (trail, created){
      user.addTrail(trail).then(function(trail) {
        res.redirect('/favorites');
      })
    })
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








// GET /:number - Gets one trail id from the database
// and uses it to look up details about that one trail
router.get("/:number", function(req, res) {
  var trailUrl = 'https://www.hikingproject.com/data/get-trails-by-id?ids=' + req.params.number + '&key=' + process.env.HIKING_PROJECT_API;
  // Use request to call the API
  axios.get(trailUrl).then( function(apiResponse) {
      let trailDetails = apiResponse.data;
      let similarLengthDetails = null;
      let similarAscentDetails = null;
      // res.json(trailDetails);
      let trailRating = apiResponse.data.trails[0].stars;
      let trailAscent = apiResponse.data.trails[0].ascent;
      let trailLength = apiResponse.data.trails[0].length;
      let trailLat = apiResponse.data.trails[0].latitude;
      let trailLng = apiResponse.data.trails[0].longitude;
      db.trail.findOne({
        where: {number: parseInt(req.params.number)},
        include: [db.comment, db.user]
      }).then(function(trail) {
        var searchUrl = 'https://www.hikingproject.com/data/get-trails?lat='+trailLat+'&lon='+trailLng+'&maxDistance=10&maxResults=20&key='+ process.env.HIKING_PROJECT_API;
        axios.get(searchUrl).then( function(apiResponse) {
          let lengthDifference = [];
          let ascentDifference = [];
          apiResponse.data.trails.forEach(function(trail) {
            lengthDifference.push(Math.abs(trailLength - trail.length));
            ascentDifference.push(Math.abs(trailAscent - trail.ascent));
          })
          let indexLength = lengthDifference.indexOf(Math.min(...lengthDifference)); // Stack overflow
          let indexAscent = ascentDifference.indexOf(Math.min(...ascentDifference)); // Stack overflow
          similarLengthDetails = apiResponse.data.trails[indexLength];
          similarAscentDetails = apiResponse.data.trails[indexAscent];
          
          
          
          
          
          // Get hike recommendations from the api
          // Make a find all api call within this geo area
          // Filter the array of results to remove trails that are...
          //   a.) too long or short
          //   b.) too much or too little ascent
          //   c.) too low a rating
          // Render that stuff into the page
          if(req.user) {
            res.render('favorites/show', { trail, trailDetails, similarLengthDetails, similarAscentDetails });
          } else {
            res.render('trail/show', { trail, trailDetails });
          }
        })
      }).catch(function(error) {
        console.log(error);
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
    res.redirect('/favorites'); 
  });
});

// POST /:number/comments
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
            res.redirect("/favorites/" + req.params.number) 
        });
    });
});

  // PUT /:number/comments
router.put("/:number/comments/:id", function(req, res) {
  db.comment.update({
      comment: req.body.comment
  }, {
      where: {id: parseInt(req.params.id)},
      include: [db.trail, db.user]
  }).then(function(comment) {
          res.redirect("/favorites/" + parseInt(req.params.number));
  });
})




module.exports = router;
