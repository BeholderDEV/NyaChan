var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Dropbox = require('dropbox');
var request = require("request");
//http://dropbox.github.io/dropbox-sdk-js/Dropbox.html
var dbx = new Dropbox({ accessToken: 'RQ4xXaH3x-AAAAAAAAAADuWlSlvLuWi5Lef3ymzTNYzSNvQY2AwDOvqmVY73I41f' });
var formidable = require('formidable');
var fs = require('fs');
var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data';

module.exports = function(app, express, path){

  app.use(express.static(path.join(__dirname, '/../')));

	app.post('/dbxPost', function (req, res) {
		var form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req);
		form.on('file', function(name, file) {
		    fs.readFile(file.path, function (err, data) {
		     	dbx.filesUpload({path: '/Midia/' + file.name, contents: data, autorename: true})
		        .then(function(response) {
	        		dbx.sharingCreateSharedLinkWithSettings({path: response.path_lower}).then(function(sharedLinkResp){
		                var urlFile = sharedLinkResp.links[0].url;
		                var pos = urlFile.search("\\?dl=0");
		                urlFile = urlFile.slice(0, pos + 1);
		                urlFile = urlFile + "raw=1";
						res.send(urlFile);
	        		})
	        		.catch(function(er){
        				dbx.sharingListSharedLinks({path: response.path_lower, direct_only: true}).then(function(existingSharedLink){
			                var urlFile = existingSharedLink.links[0].url;
			                var pos = urlFile.search("\\?dl=0");
			                urlFile = urlFile.slice(0, pos + 1);
			                urlFile = urlFile + "raw=1";
							res.send(urlFile);
        				}).catch(function(e){
    						console.log(e);
    						res.send(e);
        				});
	        		});
		        })
		        .catch(function(error) {
		          console.error('Erro ' + error);
		          res.send(error);
		        });
	  		});

		});
	})

  app.post('/recaptcha', function (req, res, $http) {
    var resp = req.body;
    console.log("Passou 1");
    var secretKey = "6LfogRgUAAAAADhwW9O5J7ZeBLrDxoy7M9vxHdIX";
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    var urldata = "?secret=" + secretKey + "&response=" + resp.response;
      console.log("Passou 1.5");


    request(verificationUrl+urldata, function(error, response, body) {
        console.log("Passou 2");
        console.log(response);
      res.send(response);
    });
})
  app.get('/tag/:tagName', function (req, res) {
     res.type('text/html');
     // res.sendFile(path.resolve('../tag.html'));
     res.sendfile('tag.html');
  })

  app.get('/thread/:idThread', function (req, res) {
     res.type('text/html');
     // res.sendFile(path.resolve('../thread.html'));
     MongoClient.connect(url, function(err, db) {
         if (err) {
           console.log('Unable to connect to the mongoDB server. Error:', err);
         } else {
           console.log('Connection established to', url);
           try {
             db.collection('thread').find( { _id: ObjectId(req.params.idThread)  }).toArray(function(error, documents) {
                 res.sendfile('thread.html');
             });
           } catch (err) {
               res.sendfile('404.html');
           }
           db.close();
         }
     });

  })
  app.get('/404', function (req, res) {
     res.type('text/html');
     // res.sendFile(path.resolve('../thread.html'));
     res.sendfile('404.html');
  })
  // app.get('*', function(req, res, next) {
  //   var err = new Error();
  //   err.status = 404;
  //   next();
  // });
  //
  // app.use(function(err, req, res, next){
  //   res.sendStatus(404);
  //   res.render('404');
  //   return;
  // });

}
