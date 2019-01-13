var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();



router.get('/', function (req, res) {
    if (req.user) {
        var username = req.user['username'];
        res.redirect(`/user/${username}`);}
    else res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.render('register', { error : err.message });
      }

      passport.authenticate('local')(req, res, function () {
          req.session.save(function (err) {
              if (err) {
                  return next(err);
              }
              res.redirect('/');
          });
      });
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");

});

module.exports = router;