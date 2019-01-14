var express = require('express');
var router = express.Router();
var Country = require('../models/country');
var Account = require('../models/account');




router.get('/submit-country', function (req, res) {
    var username = req.user['username'];
    console.log(req.user["_id"]);
    console.log(username);
    /*Account.
            findOne({username: username}).
            populate('countries').exec(function(err, account){
                for (country in account.countries) {
                    console.log(country.name);
                }
            });*/
    Country.findOne({name: "US"}).populate("owner").exec(function(err, country){
        console.log(country.owner.username);
    });
    res.redirect(`/user/${username}`);
});

router.post('/submit-country', function (req, res) {
    //console.log(req.body['countries']);
    var owner = req.user;
    var countries = req.body['countries'];
    for (var i = 0; i < countries.length; i++) {
        var country = new Country({
            name: countries[i], 
            owner: req.user["_id"]
        });
        country.save(function(err){
            if (err) console.log(err);
        });
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