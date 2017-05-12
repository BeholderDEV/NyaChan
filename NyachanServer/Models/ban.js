var mongoose = require('mongoose')

module.exports = mongoose.model('Ban', {
  dateBegin: { type: Date, default: Date.now },
  dateEnd: Date,
  IP: String,
  user: String
})
