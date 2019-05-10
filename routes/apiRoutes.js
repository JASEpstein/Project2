var db = require("../models");

module.exports = function(app) {
  // Get all categories
  app.get("/api/categories", function(req, res) {
    db.Category.findAll({}).then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

  // Create a new category
  app.post("/api/categories", function(req, res) {
    db.Category.create(req.body).then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

  // Delete an category by id
  app.delete("/api/categories/:id", function(req, res) {
    db.Category.destroy({ where: { id: req.params.id } }).then(function(
      dbCategories
    ) {
      res.json(dbCategories);
    });
  });
};
