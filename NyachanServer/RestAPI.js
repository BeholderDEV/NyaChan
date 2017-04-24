var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Dropbox = require('dropbox');
var request = require("request");
var imgResizer = require("lwip");
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

function resizeImage(file, op, callback){
		var baseH = 125;
		if(op == 1){
			baseH = 250;
		}
		imgResizer.open(file.path, function(err, image){
			var w = image.width();
			var h = image.height();
			var neww = w;
			var newh = h;
			if(w > h){
				neww = baseH;
				newh = h * (baseH / w);
			}
			else if(w > baseH || h > baseH){
				newh = baseH;
				neww = w * (baseH / h);
			}
			image.resize(neww, newh, function(err, imageResize){
				imgResizer.create(imageResize.width(), imageResize.height(), 'white', function(err, canvas){
			    canvas.paste(0, 0, imageResize, function(err, imageCanvas){
						imageCanvas.toBuffer('jpg', function(err, buffer){
						 		return callback(buffer);
						 });
			    });
				});

			});
	});
}

function setImageSizeDimension(file, callback){
	var properties = new Object();
	imgResizer.open(file.path, function(err, image){
		properties.width = image.width();
		properties.height = image.height();
		var stats = fs.statSync(file.path);
		properties.size = stats.size
		return callback(properties);
	});
}

module.exports = function(app, express, path){

	app.use(express.static(path.join(__dirname, '/../')));

	app.post('/dbxPost/:op', function (req, res) {
		var form = new formidable.IncomingForm();
		var respostaUrl = new Object();
		form.keepExtensions = true;
		form.parse(req);
		form.on('file', function(name, file) {
		    fs.readFile(file.path, function (err, data) {
					setImageSizeDimension(file, function (properties){
						respostaUrl.width = properties.width;
						respostaUrl.height = properties.height;
						respostaUrl.size = properties.size;
						sendDataDropbox(file.name, data, function(url){
							respostaUrl.mainUrl = url;
							resizeImage(file, req.params.op ,function(buffer){
								sendDataDropbox(file.name, buffer, function(urlThumb){
									respostaUrl.thumbUrl = urlThumb;
									res.send(respostaUrl);
								});
							});
						});
					});
	  		});
		});
	});

	app.post('/dbxAvatar', function (req, res) {
			var form = new formidable.IncomingForm();
			form.keepExtensions = true;
			form.parse(req);
			console.log(req);
			form.on('file', function(name, file) {
				// console.log("EXTENSION: " + file.extension);
				console.log("aa");
				fs.readFile(file.path, function (err, data) {
					resizeImage(data, 0 , function(buffer){
						sendDataDropbox(file.name, buffer, function(url){
							res.send(url);
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
