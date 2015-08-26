var express = require ('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var methodOverride = require('method-override');
var Game = require('./models/game');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var port = process.env.PORT || 9000;

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

// app.engine('ejs', require('ejs').renderFile);
// app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout.ejs');
app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.listen(port);
console.log('Server started on', port);