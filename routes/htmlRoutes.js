var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Category.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load category page and pass in a category by id
  app.get("/category/:id", function(req, res) {
    db.Category.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("category", {
        example: dbExample
      });
    });
  });
  // Load category page and pass in a category by id
  app.get("/subscription/:id", function(req, res) {
    db.Category.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("subscription", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
