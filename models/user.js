var mongoose = require('mongoose');
var bcrypt = require('bcrypt-bodejs');

var User = mongoose.Schema ({
  local: {
    email : String,
    password : String
  }
});