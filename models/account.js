var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    password: String, 
    email: {type: String, unique: true},
    username: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);