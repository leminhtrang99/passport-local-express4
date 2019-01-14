var express = require('express');
var router = express.Router();
var Country = require('../models/country');



router.get('/submit-country', function (req, res) {
    var username = req.user['username'];
    res.redirect(`/user/${username}`);
});

router.post('/submit-country', function (req, res) {
    //console.log(req.body['countries']);
    var owner = req.user;
    var countries = req.body['countries'];
    for (var i = 0; i < countries.length; i++) {
        //Create a country object
        var country = new Country({
            name: countries[i], 
            owner: req.user["_id"]
        });
        //Save country object to database
        country.save(function(err){
            if (err) console.log(err);
        });
        //Push country object to user's countries array
        owner.countries.push(country);
        owner.save(function(err){
            if (err) console.log(err);
        })
    }
    var username = req.body['username'];
    //console.log(req.user["countries"]);
    res.redirect(`/user/${username}`);
    //console.log(req.user['username']);
    //res.redirect("/submit-country");
    
});



module.exports = router;