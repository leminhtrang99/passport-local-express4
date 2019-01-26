var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var emailVerificationToken, emailAddress, mailOptions, host;


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

router.post('/register', function (req, res, next) {
    //rand = Math.floor((Math.random() * 100 + 54));
    Account.register(new Account({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        isActive: false,
        token: Account.generateJWT(),
    }), req.body.password, function (err, account) {
            
            if (err) {
                console.log(err);
                return res.render('register', { account: account });
            }
            passport.authenticate('local') (req, res, function () {
                emailVerificationToken = req.user["token"];
                emailAddress = req.body["email"];
                host = req.get('host');

                //Write email
                mailOptions = writeEmail(emailAddress, host, emailVerificationToken);
         
                //Send Email 
                sendEmail(mailOptions);

                res.redirect('/');
            });
    });
});

router.get('/verify', function (req, res) {
    //console.log(`${req.protocol}://${req.get('host')}`);
    if (`${req.protocol}://${req.get('host')}` == `http://${host}`) {
        //console.log("Domain is matched. Information is from authentic email");
        if (req.query.id == emailVerificationToken) {
            //console.log("email is verified");
            MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db,) {
                if (err) {throw err;}
                var dbo = db.db("passport_local_mongoose_express4");
                dbo.collection("accounts").findOneAndUpdate({email: mailOptions["to"]}, {$set:{isActive: true}}, {new: true}, (err, doc) => {
                    if(err) console.log(err);
                });
                    //console.log(result);
                    //account['isActive'] = true;
                    db.close();
                    //console.log("change of active status: ", account["isActive"])
                    //console.log(visitedCountries);
                    res.end(`<h1>Email ${mailOptions["to"]} has been successfully verified. Click <a href="login">here<a> to login.</h1>`);
                    //res.redirect("/login")
            });
        }
        else {
            console.log("Email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source");
    }
});

//Function that writes the email
function writeEmail(email, host, token) {
    //console.log("Reach here at least one? From writeEmail ---------------------");
    var link = `http://${host}/verify?id=${token}`;
    return mailOptions = {
        from: '"Fred Foo 👻" <f4qyvj4zqnykxug5@ethereal.email>', // sender address
        to: email, // list of receivers
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