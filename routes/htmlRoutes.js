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
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};