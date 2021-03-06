var mongoose = require('mongoose');
// require('./review')
// var Review = mongoose.model('Review');

// SCHEMA
var gameSchema = new mongoose.Schema({
  title: String,
  image: String,
  platform: String,
  release_date: Date,
  description: String,
  price: Number,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

// SCHEMA model
var Game = mongoose.model('Game', gameSchema);
module.exports = Game;
