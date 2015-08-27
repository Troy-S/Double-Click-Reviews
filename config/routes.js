var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('../controllers/users');
var gamesController = require('../controllers/games');
var staticController = require('../controllers/static')

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}

// User Routes

router.route('/')
  .get(staticController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route('/secret')
  .get(authenticatedUser, usersController.secret)

// Game Routes
router.route('/games')
  .get(authenticatedUser, gamesController.getGames)
  .post(authenticatedUser, gamesController.postGame)

router.route('/games/new')
  .get(authenticatedUser, gamesController.getNewgames)

router.route('/games/:id')
  .get(authenticatedUser, gamesController.showGames)
  .post(authenticatedUser, gamesController.updateGame)
  .post(authenticatedUser, gamesController.postReview)

router.route('/games/:id/edit')
  .get(authenticatedUser, gamesController.editGame)

module.exports = router 
