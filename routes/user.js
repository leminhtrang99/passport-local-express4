var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var visitedCountries = [];

//List of countries by continent 
var africa = ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina', 'Burundi', 'Cameroon',
    'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Republic of the Congo',
    'Democratic Republic of Congo', "Côte d'Ivoire", 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia',
    'Gabon', 'Gambia', 'Ghana', 'Guinea', 'GuineaBissau', 'Kenya', 'Lesotho', 'Liberia',
    'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia',
    'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone',
    'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Tunisia',
    'Uganda', 'Zambia', 'Zimbabwe'];
var asia = ['Afghanistan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Burma (Myanmar)',
    'Cambodia', 'China', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan',
    'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia',
    'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Philippines', 'Qatar', 'Russian Federation', 'Saudi Arabia',
    'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan',
    'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];
var europe = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
    'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
    'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City'];
var oceania = ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand',
    'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'];
var northAmerica = ['Antigua and Barbuda', 'The Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador',
    'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Trinidad and Tobago', 'United States'];
var southAmerica = ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'];


//List of country codes by continent 
var africaCodes = ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM",
    "CV", "CF", "TD", "KM", "CD", "CG",
    "CI", "DJ", "EG", "GQ", "ER", "ET",
    "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR",
    "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA",
    "NE", "NG", "RW", "ST", "SN", "SC", "SL",
    "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN",
    "UG", "ZM", "ZW"];
var asiaCodes = ["AF", "BH", "BD", "BT", "BN", "MM",
    "KH", "CN", "GE", "HK", "IN", "ID", "IR", "IQ", "IL", "JP", "JO",
    "KZ", "KW", "KG", "LA", "LB", "MY", "MV", "MN",
    "NP", "KP", "OM", "PK", "PH", "QA", "RU", "SA",
    "SG", "KR", "LK", "SY", "TW", "TJ", "TH", "TL", "TR", "TM",
    "AE", "UZ", "VN", "YE"];
var europeCodes = ["AL", "AD", "AM", "AT", "AZ", "BY", "BE", "BA", "BG",
    "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
    "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MK", "MT", "MD", "MC", "ME",
    "NL", "NO", "PL", "PT", "RO", "SM", "RS", "SK", "SI",
    "ES", "SE", "CH", "UA", "GB", "VA"];
var oceaniaCodes = ["AU", " FJ", "KI", "MH", "FM", "NR", "NZ",
    "PW", "PG", "WS", "SB", "TO", "TV", "VU"];
var northAmericaCodes = ["AG", "BS", "BB", "BZ", "CA", "CR", "CU", "DM", "DO", "SV",
    "GD", "GT", "HT", "HN", "JM", "MX", "NI", "PA", "KN", "LC", "VC",
    "TT", "US"];
var southAmericaCodes = ["AR", "BO", "BR", "CL", "CO", "EC", "GY", "PY", "PE", "SR", "UY", "VE"];

//Hashmap for country names and country codes
var asiaMap = new Map();
var africaMap = new Map();
var oceaniaMap = new Map();
var northAmericaMap = new Map();
var southAmericaMap = new Map();
var europeMap = new Map();

for (var i = 0; i < asia.length; i++) {
    asiaMap.set(asia[i], asiaCodes[i]);
}

for (var i = 0; i < africa.length; i++) {
    africaMap.set(africa[i], africaCodes[i]);
}
for (var i = 0; i < oceania.length; i++) {
    oceaniaMap.set(oceania[i], oceaniaCodes[i]);
}
for (var i = 0; i < northAmerica.length; i++) {
    northAmericaMap.set(northAmerica[i], northAmericaCodes[i]);
}
for (var i = 0; i < southAmerica.length; i++) {
    southAmericaMap.set(southAmerica[i], southAmericaCodes[i]);
}
for (var i = 0; i < southAmerica.length; i++) {
    europeMap.set(europe[i], europeCodes[i]);
}


router.get('/user/:username', function (req, res) {
    if (req.user) {
        //Display url based on username
        req.params.username = req.user['username'];
        console.log("element with id US: " + req.body["US"]);
        //console.log(req.user['username']);
        //Fetch logged data from MongoDB
        MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db,) {
            if (err) throw err;
            var dbo = db.db("passport_local_mongoose_express4");
            dbo.collection("countries").find({}).toArray(function (err,
                result) {
                if (err) throw err;
                //console.log(result);
                db.close();
                for (var i = 0; i < result.length; i++) {
                    visitedCountries.push(result[i].name);
                }
                //console.log(visitedCountries);

                res.render('user', {
                    user: req.user,
                    northAmericanCountries: northAmerica,
                    NACodes: northAmericaMap,
                    southAmericanCountries: southAmerica,
                    SACodes: southAmericaMap,
                    asianCountries: asia,
                    asCodes: asiaMap,
                    europeanCountries: europe,
                    eurCodes: europeMap,
                    oceanicCountries: oceania,
                    oceCodes: oceaniaMap,
                    africanCountries: africa,
                    afrCodes: africaMap,
                    visitedCountries: visitedCountries
                });
            });
        });
    }
    else res.redirect('/');
});



module.exports = router;
