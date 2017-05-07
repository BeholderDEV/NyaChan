var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
var ObjectId = require('mongodb').ObjectID
var Dropbox = require('dropbox')
var User = require('./user')
var mongoose = require('mongoose')
var dbx = new Dropbox({ accessToken: 'RQ4xXaH3x-AAAAAAAAAADuWlSlvLuWi5Lef3ymzTNYzSNvQY2AwDOvqmVY73I41f' })
var LocalStrategy = require('passport-local').Strategy
var bCrypt = require('bcrypt-nodejs')

module.exports = function (app, passport) {
  var url = 'mongodb://alisson:123456@ds053206.mlab.com:53206/nyachan_data'
  mongoose.connect(url)

  app.get('/app/threads', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        db.collection('thread').find({ archived: false }).toArray(function (error, documents) {
          if (error) {
            throw error
          }
          res.jsonp(documents)
        })
        db.close()
      }
    })
  })

  app.get('/api/threads', function (req, res) {
    var sortType = 'numberOfPosts'
    if (req.query.sortType) {
      sortType = req.query.sortType
    }
    var arch = false
    if (req.query.archived !== undefined) {
      arch = (req.query.archived === 'true')
    }
    var query = {}
    query[sortType] = -1
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        db.collection('thread').find({ archived: arch }).sort(query).toArray(function (error, documents) {
          if (error) {
            throw error
          }
          res.jsonp(documents)
        })

        db.close()
      }
    })
  })

  app.get('/api/thread/:idThread', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        db.collection('thread').find({ _id: ObjectId(req.params.idThread) }).toArray(function (error, documents) {
          if (error) {
            throw error
          }
          res.jsonp(documents)
        })
        db.close()
      }
    })
  })

  app.get('/api/tag/:tagName', function (req, res) {
    var sortType = 'numberOfPosts'
    if (req.query.sortType) {
      sortType = req.query.sortType
    }
    var arch = false
    if (req.query.archived !== undefined) {
      arch = (req.query.archived === 'true')
    }
    var query = {}
    query[sortType] = -1
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        db.collection('thread').find({ tags: req.params.tagName, archived: arch }).sort(query).toArray(function (error, documents) {
          if (error) {
            throw error
          }
          res.jsonp(documents)
        })

        db.close()
      }
    })
  })

  function checkArchived (threadid, callback, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        db.collection('thread').find({ _id: ObjectId(threadid) }).toArray(function (error, documents) {
          if (error) {
            throw error
          }
          if (documents[0].archived) {
            res.status(403)
            res.send({'error': 'Archived Thread'})
          } else {
            if (documents[0].numberOfPosts < 5) {
              callback(false)// não atualiza atributo Archived na Thread
            } else {
              callback(true)// atualiza atributo Archived na Thread
            }
          }
        })
        db.close()
      }
    })
  }

  app.post('/api/thread/newPost', function (req, res) {
    var newPost = req.body
    newPost.userIP = req.headers['x-forwarded-for']
    var date = new Date()
    newPost.date = date.getTime()
    if (newPost.file !== undefined) {
      var filename = newPost.file[0].name

      var validFormats = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webm', 'pdf' ]
      var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()

      if (validFormats.indexOf(ext) === -1) {
        res.status(403)
        res.send({'error': 'An error has occurred'})
        return
      }
    }
    var saveOnServer = function (pumpReached) {
      MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err)
        } else {
          console.log('Connection established to', url)
          db.collection('thread').update({ '_id': ObjectId(newPost.threadid) }, { $inc: { numberOfPosts: 1 } })
          if (pumpReached === false) {
            db.collection('thread').update({ '_id': ObjectId(newPost.threadid) }, { $set: { lastDate: newPost.date } })
          }
          db.collection('thread', function (err, collection) {
            collection.update({ '_id': ObjectId(newPost.threadid) }, { $push: { post: newPost } }, function (err, result) {
              if (err) {
                console.log('Error ' + err)
                res.send({'error': 'An error has occurred'})
              } else {
                console.log('' + result)
                res.send(newPost)
              }
            })
          })
          db.close()
        }
      })
    }
    checkArchived(newPost.threadid, saveOnServer, res)
  })

  function checkTagLimit (tag, callback) {
    var query = {}
    query['lastDate'] = -1
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        db.collection('thread').find({ tags: tag, archived: false }).sort(query).toArray(function (error, documents) {
          if (error) {
            throw error
          }
          if (documents.length > 4) {
            MongoClient.connect(url, function (err, db2) {
              if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err)
              } else {
                console.log('Connection established to', url)
                db2.collection('thread').find({ tags: tag, archived: true }).sort(query).toArray(function (error, documentsArc) {
                  if (error) {
                    throw error
                  }
                  if (documentsArc.length > 4) {
                    MongoClient.connect(url, function (err, db3) {
                      if (err) {
                        console.log('Unable to connect to the mongoDB server. Error:', err)
                      } else {
                        console.log('Connection established to', url)
                        db3.collection('thread').remove({ '_id': ObjectId(documentsArc[documentsArc.length - 1]._id) }, function(err, numberOfRemovedDocs) {
                          if (err) {
                            throw err
                          }
                          db3.close();
                        })
                      }
                    })
                  }
                })
                db2.collection('thread').update({ '_id': ObjectId(documents[documents.length - 1]._id) }, { $set: { archived: true } }, function(err, docs) {
                  if (err) {
                    throw err
                  }
                  db2.close()
                })
              }
            })
          }
          db.close()
          return callback("Deu certo tag " + tag);
        })
      }
    })
  }

  app.post('/api/thread/newThread', function (req, res) {
    var newThread = req.body
    newThread.userIP = req.headers['x-forwarded-for']
    var date = new Date()
    newThread.date = date.getTime()
    newThread.archived = false
    if (newThread.tags[0] === undefined) {
      res.status(403)
      res.send({'error': 'An error has occurred'})
      return
    }
    if (newThread.file !== undefined) {
      var filename = newThread.file[0].name

      var validFormats = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webm', 'pdf' ]
      var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()

      if (validFormats.indexOf(ext) === -1) {
        res.status(403)
        res.send({'error': 'An error has occurred'})
        return
      }
    }

    newThread.tags.forEach(function (tag) {
      console.log("Iniciou " + tag);
      checkTagLimit(tag, function (resp){
        console.log(resp);
      });
    })

    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', url)
        newThread.numberOfPosts = 1
        newThread.lastDate = newThread.date
        db.collection('thread', function (err, collection) {
          collection.insert(newThread, {safe: true}, function (err, result) {
            if (err) {
              console.log('Error ' + err)
              res.send({'error': 'An error has occurred'})
            } else {
              console.log('' + result)
              res.send(result)
            }
          })
        })
        db.close()
      }
    })
  })

  passport.serializeUser(function (user, done) {
    console.log('Serialize')
    done(null, user._id)
  })

  passport.deserializeUser(function (id, done) {
    console.log('Deserialize')
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('signup', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, login, password, done) {
    findOrCreateUser = function () {
      User.findOne({'login': login}, function (err, user) {
        if (err) {
          console.log('Error in SignUp: ' + err)
          return done(err)
        }
        if (user) {
          console.log('User already exists')
          return done(null, false)
        } else {
          var newUser = new User()
          newUser.login = login
          newUser.password = createHash(password)
          newUser.email = req.param('email')
          newUser.avatar = req.param('avatar')
          newUser.save(function (err) {
            if (err) {
              console.log('Error in Saving user: ' + err)
              throw err
            }
            console.log('User Registration succesful')
            return done(null, newUser)
          })
        }
      })
    }
    process.nextTick(findOrCreateUser)
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, login, password, done) {
    findOrCreateUser = function () {
      User.findOne({'login': login}, function (err, user) {
        if (err) {
          console.log('Error in Login: ' + err)
          return done(err)
        }
        if (!user) {
          console.log('User Not Found with username ' + user)
          return done(null, false)
        }
        return done(null, user)
      })
    }
    process.nextTick(findOrCreateUser)
  }))

  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
  }

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password)
  }

  app.post('/registerUser', function (req, res) {
    passport.authenticate('signup', function (err, user) {
      if (err) { return res.send(err) }
      if (!user) {
        res.status(403)
        res.send('Existing user')
      } else {
        res.send(user.login)
      }
    })(req, res)
  })

  app.post('/loginUser', function (req, res) {
    passport.authenticate('login', function (err, user) {
      if (err) { return res.send(err) }
      if (!user) {
        res.status(403)
        res.send('User not found')
      } else {
        if (!isValidPassword(user, req.body.password)) {
          res.status(403)
          res.send('Password does not match')
        } else {
          req.logIn(user, function (err) {
            if (err) { return next(err) }
            return res.send(user)
          })
        }
      }
    })(req, res)
  })

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/')
  }

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  app.get('/testLogin', function (req, res) {
    if (req.user) {
      console.log('Is signed')
    } else {
      console.log('Is not signed')
    }
    res.send(req.user)
  })
}
