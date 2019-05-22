$(document).ready(function() {
  //inital items array
  var items = [];

  //getting items from Cart on page load
  $(document).on("click", ".cart", function() {
    getItems();
  });

  //adding click handler that adds item to the cart
  $(document).on("click", ".add", function() {
    var id = $(this).data("id");
    alert("Item has been added to cart!");
    addItem(id);
  });

  //adding click handler that updates item quantity in cart
  $(document).on("click", ".update", function() {
    event.preventDefault();
    var quantity = $(this).data("quantity");
    var id = $(this).data("id");
    console.log("Item quantity has been updated!");
    updateItemQty(quantity, id);
  });

  //adding click handler that item from cart
  $(document).on("click", ".remove", function() {
    event.preventDefault();
    var id = $(this).data("id");
    console.log("Item has been removed cart!");
    deleteItem(id);
  });

  // This function grabs items from the database
  function getItems() {
    var id = $(this).data("id");
    $.get("/cart" + id, function(data) {
      subscriptions = data;
      createItemCard();
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
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                  <button class="btn btn-default noPad update" type="submit" value="Submit">Update Quantity</button>
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
  function addItem(id) {
    //ajax request
    $.ajax({
      //http method to create
      method: "POST",
      //url for connecting to backend
      url: "/api/cart/" + id,
      //contentType: "application/json",
      data: { quantity: 1 }
    })
      .then(function() {
        //call function to create item card
        createItemCard();
      })
      .catch(function(err) {
        //if error then send message
        console.log(err.message);
        response.send(err);
      });
  }

  // This function deletes an item from the cart page
  function deleteItem(event, id) {
    //event to prevent propagation of the same event from being called
    //event.stopPropagation();
    //declare variable that grab's item id
    //var id = $(this).data("id");
    //ajax request
    $.ajax({
      //declare http method delete
      method: "DELETE",
      //url to use to connect to controller
      url: "/api/cart/" + id
    })
      .then(function(Subscriptions) {
        res.json(Subscriptions);
        location.reload();
      })
      .catch(function(err) {
        //if error then send message
        console.log(err.message);
        response.send(err);
      });
  }

  // This function updates an item in our database
  function updateItemQty(quantity, id) {
    //ajax group
    $.ajax({
      //http method to update
      method: "PUT",
      //api url to connect to backend
      url: "/api/cart" +id,
      //set quantity to the amount user requested
      data: quantity
    })
      .then(function() {
        //createItemCard();
        res.json();
      })
      .catch(function(err) {
        //if error then send message
        console.log(err.message);
        response.send(err);
      });
  }
});
