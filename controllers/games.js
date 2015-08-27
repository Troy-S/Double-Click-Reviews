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
  Game.findById(req.params.id, function(err, game) {
    res.render('games/show',{ game: game })
  });
}

// EDIT
function editGame(req, res) {
  Game.findById(req.params.id, function(err, game){
    if(err) res.send(err);
    console.log(game);
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
      game.reviews.push({
        video: req.body.game.reviews.video,
        content: req.body.game.reviews.content
      })
      console.log(review)
      res.redirect('/games')
    }
  });

}

// function postReview(req, res){
//   Game.reviews.create({
//     video: req.body.game.reviews.video,
//     content: req.body.game.reviews.content
//   })
// }

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