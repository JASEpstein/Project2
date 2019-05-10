//npm install dotenv
require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;

var db = require("./models");

// For Passport
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  ); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./controllers/temp")(app);

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
=======
//for handlebars
app.set('views', './views')
app.engine('handlebars', exphbs({
    extname: '.handlebars'
}));
app.set('view engine', '.handlebars');

app.get("/", function(req, res) {
    res.send("Welcome to Passport with Sequelize");
  });

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth')(app, passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

var syncOptions = { force: true };

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  /*db.Category.create({
    id: 1,
    name: "Movies",
    img: "11",
    description: "blahblah",
    createdAt: "",
    updatedAt: ""
  });*/
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
