var mongoose = require('mongoose');

// SCHEMA
var gameSchema = new mongoose.Schema({
  title: String,
  platform: String,
  release_date: Date,
  description: String,
  price: Number
});

// SCHEMA model
var Game = mongoose.model('Game', gameSchema);
module.exports = Game;
