var mongoose = require('mongoose');
var Review = require('../models/review');
var Game = require('../models/game');


// RESTful routes for my website

// INDEX
function getGames(req, res) {
  Game.find({}, function(err, games) {
    res.render('games/index', { games: games});
  });
}

// NEW
function getNewgames(req, res) {
  res.render('games/new');
}

// CREATE
function postGame(req, res) {
  Game.create(req.body.game, function(err, game) {
    if(err){
      res.send(err)
    } else {
      res.redirect('/games')
    }
  });
}

// SHOW
function showGames(req, res) {
  Game.findById(req.params.id)
    .populate("reviews")
    .exec(function(err, game) {
      if (err) res.send(err);

      res.render('games/show',{ game: game })
    });
}

// EDIT
function editGame(req, res) {
  Game.findByIdAndRemove(req.params.id, function(err, game){
    if(err) res.send(err);
    res.render('games/edit', { game: game });
  });
}

// UPDATE
function updateGame(req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body.game, function(err, game){
    if(err) res.send(err);
    console.log(game);
    res.redirect('/games');
  });
}

// DELETE
function deleteGame(req, res) {
  Game.findById(req.params.id, function(err, game) {
    game.remove()
    res.redirect('/games');
  });
}


function postReview(req, res){
  Game.findById(req.params.id, function(err, game) {
    if(err){
      res.send(err)
    } else {

      var review = new Review({
        video: req.body.game.reviews.video,
        content: req.body.game.reviews.content
      })

      review.save(function(err, res){
        game.reviews.push(review);
        game.save();
      });

      res.redirect('/games/'+req.params.id);
    }
  });
}

// app.get('games/:id/delete', function(req, res) {
//   Game.findById(req.params.id, function(err, game) {
//     game.remove()
//     res.redirect('/games');
//   });
// });

module.exports = {
  getGames: getGames,
  getNewgames: getNewgames,
  postGame: postGame,
  showGames: showGames,
  editGame: editGame,
  updateGame: updateGame,
  deleteGame: deleteGame,
  postReview: postReview
}