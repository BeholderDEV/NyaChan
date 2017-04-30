var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var app = express();
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({
  secret: 'Nyahahahaha',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(bodyParser.json());

require('./databaseManager.js')(app, passport);
require('./RestAPI.js')(app, express, path);


var port = process.env.PORT || 3000;
var server = app.listen(port, function () {});
