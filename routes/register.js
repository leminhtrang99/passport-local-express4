var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var rand, mailOptions, host;


// Create a SMTP transporter object
const smtpTransport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "f4qyvj4zqnykxug5@ethereal.email",
        pass: "sfGRGbvuTe1cKnBzsg"
    }
});

router.get('/register', function (req, res) {
    res.render('register', {});
});

router.post('/register', function (req, res) {
    rand = Math.floor((Math.random() * 100 + 54));
    Account.register(new Account({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        active: false,
        token: rand.toString()
    }), req.body.password, function (err, account) {
            //console.log("Called twice?");
            if (err) {
                console.log(err);
                return res.render('register', { account: account });
            }
            passport.authenticate('local')(req, res, function () {
                //console.log("---------- Called twice?");
                //console.log("This is user: ", req.user);
                var token = req.user["token"];
                var email = req.body["email"];
                host = req.get('host');
                // write Email
                //console.log("Reach here at least one? From writeEmail ---------------------");
                // var link = `http://${req.get('host')}/verify?id=${token}`;
                // mailOptions = {
                //     from: '"Fred Foo 👻" <f4qyvj4zqnykxug5@ethereal.email>', // sender address
                //     to: email, // list of receivers
                //     subject: "Hello ✔", // Subject line
                //     text: "Hello world?", // plain text body
                //     html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                // }

                mailOptions = writeEmail(email, host, token);
                //send Email 
                sendEmail(mailOptions);

                
                res.redirect('/');
            });
    });
});

router.get('/verify', function (req, res) {
    console.log(`${req.protocol}://${req.get('host')}`);
    if (`${req.protocol}://${req.get('host')}` == `http://${host}`) {
        console.log("Domain is matched. Information is from authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");
            res.end(`<h1>Email ${mailOptions["to"]} has been successfully verified`);
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source");
    }
});

//Function that writes the email
function writeEmail(emailAddress, host, token) {
    console.log("Reach here at least one? From writeEmail ---------------------");
    var link = `http://${host}/verify?id=${token}`;
    return mailOptions = {
        from: '"Fred Foo 👻" <f4qyvj4zqnykxug5@ethereal.email>', // sender address
        to: emailAddress, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
}

//Function that sends the email
function sendEmail(email) {
    smtpTransport.sendMail(email, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");

        } else {
            console.log(`Message sent: ${response.message}`);
            res.end("sent");
        }
    });
}

module.exports = router;