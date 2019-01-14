var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    password: String, 
    username: String,
    // email: {
    //     type: String, 
    //     unique: true
    // },
    _id: {
        type: Schema.Types.ObjectId
    },
    countries: [{
        type: Schema.Types.ObjectId, 
        ref: 'Country'
    }],
},{
    usePushEach: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', userSchema);