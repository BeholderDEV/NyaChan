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

app.get('/', function (req, res) {
   res.type('text/html');
   res.sendfile('tag.html');
})

app.use('/..',express.static('css'));
app.use('/..',express.static('js'));

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {})
