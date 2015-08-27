var mongoose = require('mongoose');
require('./review')
var Review = mongoose.model('Review');

// SCHEMA
var gameSchema = new mongoose.Schema({
  title: String,
  platform: String,
  release_date: Date,
  description: String,
  price: Number,
  reviews: [Review.schema]
});

// SCHEMA model
var Game = mongoose.model('Game', gameSchema);
module.exports = Game;
