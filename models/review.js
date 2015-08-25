var mongoose = require('mongoose');

// SCHEMA
var reviewSchema = new mongoose.Schema({
  image: String,
  video: String,
  content: String,
});

// SCHEMA model
var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;