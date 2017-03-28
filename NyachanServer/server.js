var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next();
});

app.use(bodyParser.json());

require('./databaseManager.js')(app);
require('./RestAPI.js')(app, express, path);


var port = process.env.PORT || 3000;
var server = app.listen(port, function () {})
