var mongoose = require('mongoose')

module.exports = mongoose.model('Report', {
  date: String,
  reason: String,
  threadId: String,
  postId: String
})
