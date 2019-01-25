var express = require('express');
var passport = require('passport');
var router = express.Router();



router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username and/or password.',
}),
function(req, res) {
    var username = req.user['username'];
    res.redirect(`/user/${username}`);
    //console.log("logged in successfully");
});

module.exports = router;



