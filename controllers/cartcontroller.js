var db = require("../models");


//function to create routes
function router(app) {

  //==========================================================================
  // READ :: show cart by user id
  //==========================================================================
  app.get("/cart", function (request, response) {
    db.Cart.findAll({
        where: {
          UserId: request.user.id
        },
        include: [db.Subscriptions]
      }).then(function (Subscriptions) {
        response.render("cart", {
          Subscriptions,
          user: request.user
        });
        // response.json(subscription);
        console.log(Subscriptions);
      })
      .catch(function (err) {
        console.log(err.message);
        response.send(err);
      });
  });

  //==========================================================================
  // CREATE :: add new item to cart
  //==========================================================================
  app.post("/cart/:id", function (request, response) {
    db.Cart.create({
      UserId: request.user.id,
      subscriptionId: request.params.id,
      quantity: request.body.quantity, // TODO
    }).then(function (addedItem) {
      // response.json(addedItem);
      response.redirect("/subscriptions");
    }).catch(function (err) {
      console.log(err.message);
      response.send(err);
    });

  });

  //==========================================================================
  // UPDATE :: update item quantity
  //==========================================================================
  app.put("/cart/:id", function (request, response) {
    db.Cart.update({
        quantity: request.body.quantity
      }, {
        where: {
          UserId: request.user.id,
          subscriptionId: request.params.subscriptionId
        },
        include: [db.subscription]
      })
      .then(function (subscription) {
        // response.json(subscription);
        response.redirect("/cart");
      })
      .catch(function (err) {
        console.log(err.message);
        response.send(err);
      });
  });

  //==========================================================================
  // DELETE :: delete item from cart
  //==========================================================================
  app.delete("/cart/:id", function (request, response) {
    db.Cart.destroy({
      where: {
        UserId: request.user.id,
        id: request.params.id,
      }
    }).then(function () {
      response.redirect("/cart");
    }).catch(function (err) {
      console.log(err.message);
      response.send(err);
    });
  });
}

module.exports = router;