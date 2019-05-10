
module.exports = function (app) {
  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("index", user);
    } else {
      res.render("index");
    }
  });
  app.get("/signup", function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/accounts/view");
    } else {
      res.render("accounts");
    }
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};

var db = require("../models");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Category.findAll({}).then(function(dbCategories) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbCategories
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/category/:id", function(req, res) {
    db.Category.findOne({ where: { id: req.params.id } }).then(function(
      dbCategories
    ) {
      res.render("category", {
        example: dbCategories
      });
    });
  });*/

