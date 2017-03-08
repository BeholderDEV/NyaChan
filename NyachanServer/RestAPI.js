var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var path = require('path');
var fs = require("fs");
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var app = express();

// Connection URL 
var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next();
});

app.use(bodyParser.json());



app.get('/a/threads', function (req, res) {
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
    MongoClient.connect(url, function(err, db) {
        if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
        console.log('Connection established to', url);
        db.collection('thread').find( { _id: ObjectId("57fb3a3bdcba0f6a8b60f17a")  } ).toArray(function(error, documents) {
            if (err){
                throw error;
            }
            res.jsonp(documents);
        });
            
        db.close();
        }
    });
})

app.get('/a/thread/2', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
        console.log('Connection established to', url);
        db.collection('thread').find( { _id: ObjectId("57fb3ac1dcba0f6a8b60f197")  } ).toArray(function(error, documents) {
            if (err){
                throw error;
            }
            res.jsonp(documents);
        });
            
        db.close();
        }
    });
})

app.use(express.static(path.join(__dirname, '/../')));

// app.get('/', function (req, res) {
//    res.type('text/html');
//    res.sendfile('index.html') ;
// })

app.get('/tag', function (req, res) {
   res.type('text/html');
   res.sendfile('tag.html');
})

app.get('/thread', function (req, res) {
   res.type('text/html');
   res.sendfile('thread.html');
})

// app.get('/css/styles.css', function (req, res) {
//    res.type('text/css');
//    res.sendfile('css/styles.css');
// })


// app.get('/js/app.js', function (req, res) {
//    res.type('text/javascript');
//    res.sendfile('js/app.js');
// })

// app.get('/js/script.js', function (req, res) {
//    res.type('text/javascript');
//    res.sendfile('js/script.js');
// })

app.put('/a/thread/newPost', function (req, res){
    var newPost = req.body;
    console.log(newPost);
    MongoClient.connect(url, function(err, db) {
        if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
        console.log('Connection established to', url);
        
        db.collection('thread', function(err, collection) {
            collection.update({'_id': ObjectId(newPost.threadid)},{ $push: {post: newPost}}, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error ' + err);
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result);
                    res.send(newPost);
                }
            });
        });
        db.close();
        }
    });
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {})
