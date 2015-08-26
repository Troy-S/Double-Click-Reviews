var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gamesdb');

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

// RESTful routes for my website

// LAYOUT ROUTE
app.get(function(req, res) {
  res.render('layout');
});

// HOME ROUTE
app.get("/", function(req, res) {
  res.render('homepage', { header: "Search" });
});

// INDEX
app.get('/games', function(req, res) {
  Game.find({}, function(err, games) {
      res.render('games/index', { games: games });
  });
});

// NEW
app.get('/games/new', function(req, res) {
  res.render('games/new');
})

// CREATE
app.post('/games', function(req,res) {
  Game.create(req.body.game, function(err) {
    if(err){
      res.send(err)
    } else {
      res.redirect('/games')
    }
  });
});

// SHOW
app.get('/games/:id', function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    res.render('games/show',{ game: game});
  });
});

// EDIT
app.get('/games/:id/edit', function(req, res) {
  Game.findById(req.params.id, function(err, game){
    if (err) res.send(err);
    console.log(game);
    res.render('games/edit' , { game: game });
  });
});

app.put('/games/:id', function(req, res) {
  Game.findById(req.params.id, function(err, game){
    if (err) res.send(err);
    console.log(game);
    res.render('games/edit' , { game: game });
  });
});

// DELETE game from list
  // app.get('games/:id/delete', function(req, res) {
  //   Game.findById(req.params.id, function(err, game) {
  //     game.remove()
  //     res.redirect('/games');
  //   });
  // });