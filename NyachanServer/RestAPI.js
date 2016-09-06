var express = require('express');
var app = express();
var fs = require("fs");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/a/threads', function (req, res) {
   res.type('application/json');
   fs.readFile( __dirname + "/" + "tag_anime.json", 'utf8', function (err, data) {
     console.log(data);
      res.jsonp( data );
   });
})

app.get('/a/thread/1', function (req, res) {
   res.type('application/json');
   fs.readFile( __dirname + "/" + "tag_anime_thread.json", 'utf8', function (err, data) {
     console.log(data);
      res.jsonp( data );
   });
})

app.get('/', function (req, res) {
   res.type('text/html');
   res.sendfile('tag.html');
})
app.get('/thread', function (req, res) {
   res.type('text/html');
   res.sendfile('thread.html');
})
app.get('/css/estilo.css', function (req, res) {
   res.type('text/css');
   res.sendfile('css/estilo.css');
})

app.get('/js/app.js', function (req, res) {
   res.type('text/javascript');
   res.sendfile('js/app.js');
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {})
