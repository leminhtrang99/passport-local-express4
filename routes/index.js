var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {
    if (req.user) {
        if (req.user["isActive"] === false) {res.render('index', {user: req.user});}
        else {
            var username = req.user['username'];
            res.redirect(`/user/${username}`);
        }
    }
    else res.render('index', { user : req.user });

});



router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");

});

module.exports = router;