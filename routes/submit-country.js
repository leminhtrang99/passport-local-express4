var express = require('express');
var router = express.Router();
var Country = require('../models/country');


router.get('/submit-country', function(req, res) {
    var username = req.user['username'];
    
    res.redirect(`/user/${username}`);
});

router.post('/submit-country', function(req, res) {
    
    console.log(req.body['countries']);
    var countries = req.body['countries'];
    for (var i = 0; i < countries.length; i++){
        Country.create([{name: countries[i]}], function(err) {
        });
    }
    var username = req.user['username'];
    res.redirect(`/user/${username}`);
    console.log(req.user['username']);
    //res.redirect=("/submit-country");
});

module.exports = router;