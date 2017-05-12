var mongoose = require('mongoose')

module.exports = mongoose.model('Report', {
  dateBegin: Date,
  dateEnd: Date,
  reason: String,
  threadId: String,
  postId: String
})

