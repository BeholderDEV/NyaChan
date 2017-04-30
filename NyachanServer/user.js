var mongoose = require('mongoose')

module.exports = mongoose.model('User', {
  login: String,
  password: String,
  email: String,
  avatar: String
})
