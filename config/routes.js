var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('./controllers/users');
var gamesController = require('./controllers/games');

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}

// User Routes
router.route('/secret')
  .get(authenticatedUser, usersController.secret)

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

// Game Routes
router.route('homepage')
  .get(gamesController.getHomepage)

router.route('layout')
  .get(gamesController.getLayout)

router.route('/games')
  .get(gamesController.getGames)

router.route('/games/new')
  .get(gamesController.getNewgames)

//Not sure if this is right...
router.route('/games/new')
  .get(gamesController.getNewgames)
  .post(gamesController.postGame)

router.route('games/show')
  .get(gamesController.showGames)

module.exports = router 
