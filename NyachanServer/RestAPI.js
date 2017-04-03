var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Dropbox = require('dropbox');
var request = require("request");
var imgResizer = require("lwip");
//http://dropbox.github.io/dropbox-sdk-js/Dropbox.html
var dbx = new Dropbox({ accessToken: 'RQ4xXaH3x-AAAAAAAAAADuWlSlvLuWi5Lef3ymzTNYzSNvQY2AwDOvqmVY73I41f' });
var formidable = require('formidable');
var fs = require('fs');
var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data';


function sendDataDropbox(name, data, callback){
	console.log("Sending");
 	dbx.filesUpload({path: '/Midia/' + name, contents: data, autorename: true})
    .then(function(response) {
		dbx.sharingCreateSharedLinkWithSettings({path: response.path_lower}).then(function(sharedLinkResp){
            var urlFile = sharedLinkResp.links[0].url;
            var pos = urlFile.search("\\?dl=0");
            urlFile = urlFile.slice(0, pos + 1);
            urlFile = urlFile + "raw=1";
			return callback(urlFile);
		})
		.catch(function(er){
			dbx.sharingListSharedLinks({path: response.path_lower, direct_only: true}).then(function(existingSharedLink){
                var urlFile = existingSharedLink.links[0].url;
                var pos = urlFile.search("\\?dl=0");
                urlFile = urlFile.slice(0, pos + 1);
                urlFile = urlFile + "raw=1";
				return callback(urlFile);
			}).catch(function(e){
				console.error('Erro ' + e);
				return callback("Erro");
			});
		});
    })
    .catch(function(error) {
      console.error('Erro ' + error);
      return callback("Erro");
    });
}

module.exports = function(app, express, path){

	app.use(express.static(path.join(__dirname, '/../')));

	app.post('/dbxPost', function (req, res) {
		var form = new formidable.IncomingForm();
		var respostaUrl = new Object();
		var writeStream = fs.createWriteStream('C:\\Augustop\\aaa.jpg');
		form.keepExtensions = true;
		form.parse(req);
		form.on('file', function(name, file) {
		    fs.readFile(file.path, function (err, data) {
		    	sendDataDropbox(file.name, data, function(url){
		    		respostaUrl.mainUrl = url;
	    		    imgResizer.open(data, 'png', function(err, image){
						imgResizer.resize(125, 125, function(err, imageResize){
							sendDataDropbox(file.name, imageResize, function(urlThumb){
								respostaUrl.thumbUrl = urlThumb;
								res.send(respostaUrl);
							});
						});		
				   	});
		    	});
	  		});
		});
	});

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
	});

  app.get('/tag/:tagName', function (req, res) {
     res.type('text/html');
     // res.sendFile(path.resolve('../tag.html'));
     res.sendfile('tag.html');
  });

  app.get('/thread/:idThread', function (req, res) {
     res.type('text/html');
     // res.sendFile(path.resolve('../thread.html'));
     res.sendfile('thread.html');
  });

  app.get('/404', function (req, res) {
     res.type('text/html');
     // res.sendFile(path.resolve('../404.html'));
     res.sendfile('404.html');
  });

  // app.get('*', function(req, res, next) {
  //   res.sendfile('404.html');
  // });
  //
  // app.use(function(err, req, res, next){
  //   res.sendfile('404.html');
  // });

};
