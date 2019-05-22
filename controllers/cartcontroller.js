var db = require("../models");

//function to create routes
function router(app) {
  //==========================================================================
  // READ :: show cart by user id
  //==========================================================================
  /*
      importCache:
      { 'C:\\Users\\Lisa Vo\\Project2\\models\\cart.js': Cart,
        'C:\\Users\\Lisa Vo\\Project2\\models\\category.js': Category,
        'C:\\Users\\Lisa Vo\\Project2\\models\\subscription.js': Subscription,
        'C:\\Users\\Lisa Vo\\Project2\\models\\user.js': user } },
  */
  app.get("/cart", function(request, response) {
    console.log(db);
    db.Cart.findAll({
      //car at user id :: user must be logged in for cart to work
      where: {
        UserId: request.user.id
      }
      // include: [{ model: db.Subscription }]
    })
      .then(function(Subscriptions) {
        response.render("cart", {
          Subscriptions: Subscriptions,
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
      quantity: request.body.quantity
    })
      .then(function(Subscriptions) {
        response.json(Subscriptions);
        //once cart is created render the item to cart page
        //response.redirect("/cart");
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
        //in the cart with the user id and subscription id
        where: {
          UserId: request.user.id,
          subscriptionId: request.params.id
        }
        //include: [db.subscription]
      }
    )
      .then(function(Subscriptions) {
        response.json(Subscriptions);
        //redirect back to the cart page after done
        //response.redirect("/cart");
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
    //console.log(db);
    var item = "id = " + request.params.id;
    console.log("item" + item);
    db.Cart.destroy(item, {
      //destroy cart item at id selected
      where: {
        // UserId: request.user.id,
        id: item
      }
    })
      .then(function(Subscriptions) {
        response.json(Subscriptions);
        //redirect to the cart page once done
        //response.redirect("/cart");
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
