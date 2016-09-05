'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var apiController = require('../Controllers/api.js');
var request = require('request');


// ROUTE TO RETRIEVE API(S) DATA 
router.route('/events/')
	.get(function(req, res) {
    var loc = req.query.loc
    var timeframe = req.query.timeframe

		apiController.getEvents(loc, timeframe, function(err, data){
      if(err) {
        res.status(404).send("did not find events")
      } else {
        res.json(data)
      }
    });
	});

module.exports = router;