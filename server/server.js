var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./config/routes.js');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up routes
app.use('/api', router);

// Set up ports
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = app;