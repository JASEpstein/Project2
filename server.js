//npm install dotenv
require("dotenv").config();
//assigns the express module to a variable express.
//we then initialize the variable and call it "app".
var express = require("express");
var app = express();
//npm install all of the ones below or login will not work.
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var bCrypt = require("bcrypt-nodejs");
var mysql = require("mysql");
var mysql2 = require("mysql2");
var sequelize = require("sequelize");

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;

var db = require("./models");

// For Passport
app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true
    })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static('public'));

//for handlebars
app.set('views', './views')
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', '.handlebars');

//Models
var models = require("./models");

//Routes
require('./routes/auth')(app, passport);
require('./routes/htmlRoutes')(app);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

var syncOptions = {
    force: false
};

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}


//app listening on port 5000.
db.sequelize.sync({
    syncOptions
}).then(function () {
    app.listen(PORT, function (err) {
        if (!err) console.log("Site is live");
        else console.log(err);
    });
});

module.exports = app;