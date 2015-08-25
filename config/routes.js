var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var UsersController = require('../controllers/users');
var GamesController = require('../controllers/games');

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}

router.route('/secret')
  .get(authenticatedUser, usersController.secret)

router.route('/')
  .get(staticsController.home);
