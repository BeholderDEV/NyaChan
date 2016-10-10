var express = require('express');
var app = express();
var fs = require("fs");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL
var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data';

//    MongoClient.connect(url, function(err, db) {
//        if (err) {
//        console.log('Unable to connect to the mongoDB server. Error:', err);
//        } else {
//        console.log('Connection established to', url);
//
//        var cursor = db.collection('thread').find({ "tags": "Anime" });
//        
//        cursor.each(function(err, doc) {
//            if (doc != null) {
//                console.dir(doc);
//            } else {
//                console.log("SHIT");
//            }
//        });
//            
//        db.close();
//        }
//    });



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/a/threads', function (req, res) {
//   res.type('application/json');
//   fs.readFile( __dirname + "/" + "tag_anime.json", 'utf8', function (err, data) {
//     console.log(data);
//      res.jsonp( data );
//   });
    MongoClient.connect(url, function(err, db) {
        if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
        console.log('Connection established to', url);
        db.collection('thread').find( { } ).toArray(function(error, documents) {
            if (err){
                throw error;
            } 
            res.jsonp(documents);
        });
            
        db.close();
        }
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
//var port = 3000;
var server = app.listen(port, function () {})
