var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Dropbox = require('dropbox');
//http://dropbox.github.io/dropbox-sdk-js/Dropbox.html
var dbx = new Dropbox({ accessToken: 'RQ4xXaH3x-AAAAAAAAAADuWlSlvLuWi5Lef3ymzTNYzSNvQY2AwDOvqmVY73I41f' });

module.exports = function(app){

	// Connection URL
	var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data';

	app.get('/app/threads', function (req, res) {
		MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			console.log('Connection established to', url);
			db.collection('thread').find( { } ).toArray(function(error, documents) {
			    if (err){
			        res.status(404).send("Not Found");
			    }
			    res.jsonp(documents);
			});

			db.close();
		  }
		});
	})


  app.get('/app/thread/:idThread', function (req, res) {
      MongoClient.connect(url, function(err, db) {
	        if (err) {
	        	console.log('Unable to connect to the mongoDB server. Error:', err);
	        } else {
		        console.log('Connection established to', url);
						try {
							db.collection('thread').find( { _id: ObjectId(req.params.idThread)  }).toArray(function(error, documents) {
			            if (error){
										res.status(404).send("Not Found");
			            }
			            res.jsonp(documents);
			        });
						} catch (err) {
						    console.error("AAAAAAA" + err);
								// res.writeHead(404, {location: 'https://nyachan-server.herokuapp.com/app/tag/a'});
								// res.end();
								// res.redirect("/404");
								res.status(404).send("Not Found");
						}
		        db.close();
	        }
	    });
	})

  app.get('/app/tag/:tagName', function (req, res) {
      MongoClient.connect(url, function(err, db) {
	        if (err) {
	        	console.log('Unable to connect to the mongoDB server. Error:', err);
	        } else {
		        console.log('Connection established to', url);
		        db.collection('thread').find( { tags: req.params.tagName} ).toArray(function(error, documents) {
		            if (err){
		                res.status(404).send("Not Found");
		            }
		            res.jsonp(documents);
		        });

		        db.close();
	        }
	    });
	})

	app.post('/app/thread/newPost', function (req, res){
	    	var newPost = req.body;
	    	console.log(newPost);
			var date = new Date();
			newPost.date =  date.getTime();

            if(newPost.file!==undefined)
            {
                var filename = newPost.file[0].name;

                var validFormats = ['jpg','jpeg','png', 'gif','bmp', 'webm', 'pdf' ];
                var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();

                if(validFormats.indexOf(ext) == -1)
                {
                    res.status(403);
                    res.send({'error':'An error has occurred'});
                    return;
                }
            }
			MongoClient.connect(url, function(err, db) {
	        if (err) {
	        	console.log('Unable to connect to the mongoDB server. Error:', err);
	        } else {
		        console.log('Connection established to', url);

		        db.collection('thread', function(err, collection) {
		            collection.update({'_id': ObjectId(newPost.threadid)},{ $push: {post: newPost}}, function(err, result) {
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

	app.post('/thread/newThread', function (req, res){
      var newThread = req.body;
			var date = new Date();
			newThread.date =  date.getTime();
			if(newThread.tags == undefined){
				res.status(403);
				res.send({'error':'An error has occurred'});
				return;
			}
            if(newThread.file!==undefined)
            {
                var filename = newThread.file[0].name;

                var validFormats = ['jpg','jpeg','png', 'gif','bmp', 'webm', 'pdf' ];
                var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();

                if(validFormats.indexOf(ext) == -1)
                {
                    res.status(403);
                    res.send({'error':'An error has occurred'});
                    return;
                }
            }
			MongoClient.connect(url, function(err, db) {
	        if (err) {
	        	console.log('Unable to connect to the mongoDB server. Error:', err);
	        } else {
		        console.log('Connection established to', url);

		        db.collection('thread', function(err, collection) {
		            collection.insert(newThread, {safe:true}, function(err, result) {
		                if (err) {
		                    console.log('Error ' + err);
		                    res.send({'error':'An error has occurred'});
		                } else {
		                    console.log('' + result);
		                    res.send(result);
		                }
		            });
		        });
		        db.close();
	        }
	    });
	})

}
