module.exports = function(app, express, path){

  app.use(express.static(path.join(__dirname, '/../')));

  app.get('/tag', function (req, res) {
     res.type('text/html');
     res.sendfile('tag.html');
  })

  app.get('/thread', function (req, res) {
     res.type('text/html');
     res.sendfile('thread.html');
  })
}

