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

  //---------------------------------

  // Get all cart
  app.get("/api/cart", function(req, res) {
    db.Cart.findAll({}).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  // Create a new cart
  app.post("/api/cart", function(req, res) {
    db.Cart.create(req.body).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  // Delete an cart by id
  app.delete("/api/cart/:id", function(req, res) {
    db.Cart.destroy({ where: { id: req.params.id } }).then(function(dbCart) {
      res.json(dbCart);
    });
  });

  //--------------------------------

  // Get all subscriptions
  app.get("/api/subscriptions", function(req, res) {
    db.Subscriptions.findAll({}).then(function(dbSubscriptions) {
      res.json(dbSubscriptions);
    });
  });

  // Create a new subscription
  app.post("/api/subscriptions", function(req, res) {
    db.Subscriptions.create(req.body).then(function(dbSubscriptions) {
      res.json(dbSubscriptions);
    });
  });

  // Delete a subscription by id
  app.delete("/api/cart/:id", function(req, res) {
    db.Subscriptions.destroy({ where: { id: req.params.id } }).then(function(
      dbSubscriptions
    ) {
      res.json(dbSubscriptions);
    });
  });
};
