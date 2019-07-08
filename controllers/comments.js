require('dotenv').config();
const express = require('express');
const db = require('../models');
const router = express.Router();


router.get("/:id/edit", function(req, res) {
    // TODO Update Route
    let id = parseInt(req.params.id);
    console.log(id);
    db.comment.findOne({
      where: {id: parseInt(req.params.id)},
      include: [db.trail, db.user]
    }).then(function(comment) {
      // res.json(comment);
      res.render("comments/edit", {comment});
    });
  
  });


 

  module.exports = router;

