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
var Cart = require("../models/cart.js")

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
      // if (err) {
      //   throw err;
      // } else {
      //   var subscriptionChunks = [];
      //   var chunkSize = 4;
      //   for (var i; i < dbSubscription.length; i += chunkSize) {
      //     subscriptionChunks.push(dbSubscription.slice(i, i + chunkSize));
      //   }
      // }
      res.render("animeSubscription", {
        // examples: subscriptionChunks
        examples: dbSubscription
      });
    });
  });

  //Load click for cart
  app.get("/add-to-cart/:id", function(req, res) {
    db.Subscription.findAll({}).then(function(err, dbSubscription) {
      var subscriptionId = req.params.id;
      var cart = new Cart(req.session.Cart ? req.session.cart: {});

      db.Subscription.find({
        where: {
          id: Id
        }
      }).then(function(err, subscription) {
        if (err) {
          return err;
        }
        cart.add(subscription, subscription.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/");
      });
    });

    //load page for cart
    app.get("/cart", function(req, res) {
      if (!req.session.cart) {
        return res.render("./views/cart", {
          subscription: cart.generateArray(),
          totalPrice: cart.totalPrice
        });
      }
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
  });
};
