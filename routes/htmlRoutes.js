module.exports = function(app) {
  app.get("/", function(req, res) {
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
  app.get("/signup", function(req, res) {
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

  // Load animeSubscription page
  app.get("/subscription", function(req, res) {
    db.Subscription.findAll({}).then(function(err, dbSubscription) {
      res.render("animeSubscription", {
        examples: dbSubscription
      });
    });
  });

  //cart page
  app.get("/cart", function(req, res) {
    db.Cart.findAll({}).then(function(dbCart) {
      res.render("cart", {
        msg: "Welcome to the Shopping cart!",
        examples: dbCart
      });
    });
  });

  //cart page
  app.get("/order", function(req, res) {
    db.Cart.findAll({}).then(function(dbCart) {
      res.render("checkout", {
        examples: dbCart
      });
    });
  });

  // //Load click for cart
  // app.get("/addItem/:id", function(req, res) {
  //   db.Subscription.findAll({}).then(function(err, dbSubscription) {
  //     var itemId = req.params.id;
  //     var cart = new Cart(req.session.Cart ? req.session.cart : {});

  //     db.Subscription.find({
  //       where: { id: itemId }
  //     }).then(function(err, subscription) {
  //       if (err) {
  //         return err;
  //       }
  //       cart.add(subscription, subscription.id);
  //       req.session.cart = cart;
  //       console.log(req.session.cart);
  //       res.redirect("/");
  //     });
  //   });

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
};
