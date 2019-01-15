var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    rand = Math.floor((Math.random() * 100 + 54));
    Account.register(new Account({ 
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username : req.body.username,
        active: false,
        token: rand.toString()
    }), 
    req.body.password, 
    function(err, account) {
        if (err) {
            console.log(err);
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            var token = encodeURIComponent(req.user["token"]);
            var email = encodeURIComponent(req.body["email"]);
            res.redirect(`/send?email=${email}`);
        });
    });
});

module.exports = router;