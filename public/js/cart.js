// import { canTreatArrayAsAnd } from "sequelize/types/lib/utils";

$(document).ready(function() {

  //inital items array
  var items = [];

  //getting items from Cart on page load
  getItems();

  //adding click handler that adds item to the cart
  $(document).on("click", ".add", function() {
    console.log("Item has been added to cart!");
    addItem();   
  });

  //adding click handler that updates item quantity in cart
  $(document).on("click", ".update", function() {
    console.log("Item quantity has been updated!");
    updateItemQty();   
  });

  //adding click handler that item from cart
  $(document).on("click", ".remove", function() {
    console.log("Item has been added to cart!");
    deleteItem();   
  });

  // This function grabs items from the database
  function getItems() {
    $.get("/api/subscription", function(data) {
      subscriptions = data;
    });
  }

  //function to create card for each item added to the cart
  function createItemCard(subscription) {
    return $(
      `<div class="row cart-row">  
        <div class="col-md-3 col-sm-6 cartItem">
          <div class="thumbnail">
            <img src="${subscription.img}" alt="${subscription.name}">
            </a>
            <div class="caption">
              <h3>${subscription.name}</h3>
              <p class="price">$${subscription.price}</p>
              <form method="POST" action="/cart/id/?_method=PUT">
                <input type="hidden" value="id" name="itemId">
                <div class="form-group">
                  <label for="quantity">Qty</label>
                  <select class="form-control cartItem-dropdown" id="quantity" name="quantity">
                    <option selected>1</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <button class="btn btn-default noPad" type="submit" value="Submit">Update Quantity</button>
                </div>
              </form>
              <form method="POST" action="/cart/id?_method=DELETE">
                <div class="form-group">
                  <div class="btn-group"> 
                    <button class="btn btn-danger" type="submit" value="Submit">Remove</button>
                  </div>
                  <input type="hidden" value="id" name="quantity">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>`
    );
  }

  //function adds an item to the cart page 
  function addItem() {
    $.ajax({
      method: "POST",
      url: "/api/cart/:id",
      contentType: "application/json",
      data: subscriptions
    }).then(function() {
      createItemCard();
    }).catch(function(err) {
      console.log(err.message);
      response.send(err);
  });
  }


  // This function deletes an item from the cart page
  function deleteItem(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/cart/" + id
    }).then(function(getItems){
    res.json(getItems);
    }).catch(function(err) {
    console.log(err.message);
    response.send(err);
    });
  }

    // This function updates an item in our database
    function updateItemQty(subscription) {
      $.ajax({
        method: "PUT",
        url: "/api/cart",
        quantity: +1
      }).then(function(getItems) {
      createItemCard();
      res.json(getItems);
      }).catch(function(err) {
      console.log(err.message);
      response.send(err);
      });
    }
});