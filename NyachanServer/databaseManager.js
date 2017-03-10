var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;

module.exports = function(app){

	// Connection URL
	var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data';

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

	app.put('/a/thread/newPost', function (req, res){
		if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
	return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
}
		// Put your secret key here.
		var secretKey = "6LfogRgUAAAAADhwW9O5J7ZeBLrDxoy7M9vxHdIX";
		// req.connection.remoteAddress will provide IP address of connected user.
		var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
		// Hitting GET request to the URL, Google will respond with success or error scenario.
		request(verificationUrl,function(error,response,body) {
			body = JSON.parse(body);
			// Success will be true or false depending upon captcha validation.
			if(body.success !== undefined && !body.success) {
				return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
			}
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

}
