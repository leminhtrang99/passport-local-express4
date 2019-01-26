var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');

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
    isActive: false,
    token: String,
    countries: [{
        type: Schema.Types.ObjectId,
        ref: 'Country'
    }],
}, {
        usePushEach: true
    });

//Generate token
accountSchema.statics.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

accountSchema.statics.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};


accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
//module.exports.generateJWT = accountSchema.methods.generateJWT;