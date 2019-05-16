var db = require("../models");

//function to create routes
function router(app) {
  //==========================================================================
  // READ :: show cart by user id
  //==========================================================================
  app.get("/cart", function(request, response) {
    db.Cart.findAll({
      where: {
        UserId: request.user.id
      }
      //include: [db.Subscriptions]
    })
      .then(function(Subscriptions) {
        response.render("cart", {
          //Subscriptions,
          user: request.user
        });
        // response.json(subscription);
        console.log(Subscriptions);
      })
      .catch(function(err) {
        console.log(err.message);
        response.send(err);
      });
  });

  app.get("/isloggedin", function(req, res) {
    res.end(Boolean(req.user).toString());
  });

  //==========================================================================
  // CREATE :: add new item to cart
  //==========================================================================
  app.post("/api/cart/:id", function(request, response) {
    db.Cart.create({
      //create cart
      UserId: request.user.id,
      subscriptionId: request.params.id,
      quantity: request.body.quantity // TODO
    })
      .then(function(addedItem) {
        // response.json(addedItem);
        //once cart is created render the item to cart page
        response.redirect("/cart");
      })
      .catch(function(err) {
        //if error then show message
        console.log(err.message);
        response.send(err);
      });
  });

  //==========================================================================
  // UPDATE :: update item quantity
  //==========================================================================
  app.put("/api/cart/:id", function(request, response) {
    db.Cart.update(
      {
        //grab qty from user choice to change
        quantity: request.body.quantity
      },
      {
        //in the cart with the user id and sybscription id
        where: {
          UserId: request.user.id,
          subscriptionId: request.params.subscriptionId
        },
        include: [db.subscription]
      }
    )
      .then(function(subscription) {
        // response.json(subscription);
        //redirect back to the cart page after done
        response.redirect("/cart");
      })
      .catch(function(err) {
        //if error then show message
        console.log(err.message);
        response.send(err);
      });
  });

  //==========================================================================
  // DELETE :: delete item from cart
  //==========================================================================
  app.delete("/api/cart/:id", function(request, response) {
    db.Cart.destroy({
      //destroy cart at user id and item id selected
      where: {
        UserId: request.user.id,
        id: request.params.id
      }
    })
      .then(function() {
        //redirect to the cart page once done
        response.redirect("/cart");
      })
      .catch(function(err) {
        //if error then show message
        console.log(err.message);
        response.send(err);
      });
  });
}

//export as router
module.exports = router;
