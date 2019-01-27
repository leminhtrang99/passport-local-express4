var express = require('express');
var passport = require('passport');
var router = express.Router();



router.get('/login', function(req, res) {
    res.render('login', { 
        user : req.user,
        message: req.flash('error')
    });
    //console.log(req.flash('error','Invalid username and/or password.'));
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password',
}),
function(req, res) {
    if (req.user["isActive"]==false) res.redirect('/');
    //console.log(req.user["isActive"]);
    var username = req.user['username'];
    
    res.redirect(`/user/${username}`);
    //console.log("logged in successfully");
});

module.exports = router;



