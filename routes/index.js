var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();



router.get('/', function (req, res) {
    res.render('index', { user : req.user });
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


//Submit country
// router.get('/submit-country', function(req, res) {
//     var test = ["a", "b", "c"];
//     res.render('index', {test: test});
    
// });

// router.post('/submit-country', function(req, res) {
//     Country.create({ name : req.body['country-name']}, function(err) {
//         if (err) console.log(err);
//         console.log("success");
//         res.redirect('/');
//     });
//     console.log(req.body['country-name']);
// });

module.exports = router;