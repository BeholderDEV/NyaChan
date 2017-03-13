var Dropbox = require('dropbox');
var request = require("request");
//http://dropbox.github.io/dropbox-sdk-js/Dropbox.html
var dbx = new Dropbox({ accessToken: 'RQ4xXaH3x-AAAAAAAAAADuWlSlvLuWi5Lef3ymzTNYzSNvQY2AwDOvqmVY73I41f' });
var formidable = require('formidable');
var fs = require('fs');

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
        console.log("response : " + response);
        console.log("body : " + body);
      res.send(response);
    });
})
  app.get('/tag', function (req, res) {
     res.type('text/html');
     res.sendfile('tag.html');
  })

  app.get('/thread', function (req, res) {
     res.type('text/html');
     res.sendfile('thread.html');
  })

}
