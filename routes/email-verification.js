var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
var path = require("path");
var jade = require('jade');


// /*
//     Here we are configuring our SMTP Server details.
//     STMP is mail server which is responsible for sending and recieving email.
// */
// var smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: "leminhtrang99@gmail.com",
//         pass: "Trang9699"
//     }
// });
var rand, mailOptions, host, link;
// // /*------------------SMTP Over-----------------------------*/

// // Generate SMTP service account from ethereal.email
// let account = nodemailer.createTestAccount();



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



router.get('/email-verification', function (req, res) {
    res.sendFile('email.html', {
        root: path.join(__dirname, '../views')
    },
    // res.render('email',
        function (err) {
            if (err) console.log(err);
        });
})

router.get('/send', function (req, res) {
    rand = Math.floor((Math.random() * 100 + 54));
    host = req.get('host');
    link = `http://${req.get('host')}/verify?id=${rand}`;
    // setup email data with unicode symbols
    mailOptions = {
        from: '"Fred Foo 👻" <f4qyvj4zqnykxug5@ethereal.email>', // sender address
        to: req.query.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    };

    //console.log(mailOptions);
    //console.log("host: ", req.get('host'));
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");

        } else {
            console.log(`Message sent: ${response.message}`);
            res.end("sent");
        }
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

module.exports = router;