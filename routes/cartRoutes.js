// var express = require("express");
// var router = express.Router();
// var Cart = require("../models/cart");
// var fs = require("fs");

// var products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

// // //route to display the shopping cart
// // router.get("/", function(req, res) {
// //   var productId = products && products[0].id;

// //   res.render("index", { title: "Shopping Cart", products: products });
// // });

// //route to add an item to the shopping cart
// router.get("/add/:id", function(req, res) {
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : { item: {} });
//   var product = products.filter(function(item) {
//     return item.id === productId;
//   });
//   cart.add(product[0], productId);
//   //stores the product in session storage
//   req.session.cart = cart;
//   //console.log session to check if it is working
//   console.log(req.session.cart);
//   //redirects back to the main page
//   res.redirect("/");
//   inline();
// });

// //route to remove an item from the shopping cart
// router.get("/remove/:id", function(req, res) {
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : { item: {} });

//   cart.destroy(productId);
//   //stores the cart minus the deletes item in session storage
//   req.session.cart = cart;
//   //console.log session to check if it is working
//   console.log(req.session.cart);
//   //redirects you back to the newly saved cart
//   res.redirect("/cart");
// });

// //route to display shopping cart
// router.get("/cart", function(req, res) {
//   //check to see if there is already a cart saved to the session
//   //are there products in the cart or no?
//   if (!req.session.cart) {
//     return res.render("cart", {
//       products: null
//     });
//   }
//   //if there is a cart then create a new cart from the old cart stored in the session
//   var cart = new Cart(req.session.cart);
//   //render shopping cart
//   res.render("cart", {
//     title: "Shopping Cart",
//     products: cart.itemsArray(),
//     totalPrice: cart.totalPrice
//   });
// });

// module.exports = router;
