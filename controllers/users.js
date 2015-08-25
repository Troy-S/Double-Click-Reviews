var passport = require("passport")

// GET SIGNUP
function getSignup(request, response) {
  response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST SIGNUP
function postSignup(request, response) {

  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signupStrategy(request, response);
}

// GET LOGIN
function getLogin(request, response) {
  response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST LOGIN
function postLogin(request, response) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  });
  return loginStrategy(request, response);
}

// GET LOGOUT
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}

// Restricted page
function secret(request, response){
  response.render('secret.ejs')
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
}