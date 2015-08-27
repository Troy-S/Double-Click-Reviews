var express = require ('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var methodOverride = require('method-override');
var Game = require('./models/game');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost/gamesdb');


var port = process.env.PORT || 9000;

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.use(cookieParser());
app.use(bodyParser()); 


// app.engine('ejs', require('ejs').renderFile);
// app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout.ejs');
app.set('view engine', 'ejs');
// app.set('views', './views')
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

app.use(morgan('dev'));
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// Error handling
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

require('./config/passport')(passport);

// This middleware will allow us to use the current user in the layout
app.use(function (req, res, next) {
  global.user = req.user;
  next()
});


var routes = require('./config/routes');
app.use(routes);

app.listen(port);
console.log('Server started on', port);