var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.uuid);
  });
  passport.deserializeUser(function(uuid, done) {
    db.Accounts.findById(uuid).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "accountKey",
        passReqToCallback: true
      },
      function(req, email, accountKey, done) {
        process.nextTick(function() {
          db.Accounts.findOne({
            where: {
              email: email
            }
          }).then(function(user, err) {
            if (err) {
              console.log("err", err);
              return done(err);
            }
            if (user) {
              console.log("signupMessage", "That email is already taken.");
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              db.Accounts.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                balance: req.body.balance,
                email: req.body.email,
                phone: req.body.phone,
                accountKey: db.Accounts.generateHash(accountKey)
              })
                .then(function(dbUser) {
                  return done(null, dbUser);
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        });
      }
    )
  );
};
