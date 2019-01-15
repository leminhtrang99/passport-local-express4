var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema({
    password: String, 
    username: String,
    email: {
        type: String, 
        unique: true
    },
    _id: {
        type: Schema.Types.ObjectId
    },
    active: false,
    token: String,
    countries: [{
        type: Schema.Types.ObjectId, 
        ref: 'Country'
    }],
},{
    usePushEach: true
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);