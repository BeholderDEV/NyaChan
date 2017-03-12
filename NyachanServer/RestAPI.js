var Dropbox = require('dropbox');
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
						res.send(sharedLinkResp);
	        		})
	        		.catch(function(er){
        				console.error('Erro ' + er);
	          			res.send(er);
	        		});
		        })
		        .catch(function(error) {
		          console.error('Erro ' + error);
		          res.send(error);
		        });
	  		});

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

