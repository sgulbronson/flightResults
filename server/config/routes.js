'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var apiController = require('../controllers/flightResultsApi.js');
var request = require('request');


// ROUTE TO RETRIEVE API(S) DATA 
router.route('/flightsearch/')
	.get(function(req, res) {
    var reqObj = {
      origin: req.query.origin,
      destination: req.query.destination,
      dateOut: req.query.dateOut,
      dateIn: req.query.dateIn,
      adultCount: req.query.adultCount,
      infantInLapCount: req.query.infantInLapCount,
      infantInSeatCount: req.query.infantInSeatCount,
      childCount: req.query.childCount,
      seniorCount: req.query.seniorCount
    }

		apiController.getFlightResults(reqObj, function(err, data){
      if(err) {
        res.status(404).send("No flight results")
      } else {
        res.json(data)
      }
    });
	});

module.exports = router;