var db = require("../models");

module.exports = function(app) {
  // Get all categories
  app.get("/api/categories", function(req, res) {
    db.Category.findAll({}).then(function(dbExamples) {
      res.render(dbExamples);
    });
  });
};
