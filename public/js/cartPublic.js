$(document).ready(function() {
  // Adding event listeners for deleting, editing cart items
  $(document).on("click", "button.delete", deleteItem);
  $(document).on("click", "button.update", updateItemQty);
  $(document).on("click", "button.add", addItem);

  //inital items array
  var items = [];

  //getting items from Cart on page load
  getItems();

  //function to reset the items displayed with new items from the db
  function initializeRows() {
    $itemContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < todos.length; i++) {
      rowsToAdd.push(createNewRow(todos[i]));
    }
    $todoContainer.prepend(rowsToAdd); 
  }

  // This function grabs items from the database and updates the view
  function getItems() {
    $.get("/api/subscriptions", function(data) {
      subscriptions = data;
      initializeRows();
    });
  }

  //function to create card for each item added to the cart
  function createItemCard (subscription) {
    return $(`<div class="row cart-row">  
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

  // This function deletes an item when the user clicks the delete button
  function deleteItem(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/subscriptions/" + id
    }).then(getItems);
  }

    // This function updates an item in our database
    function updateItem(subscription) {
      $.ajax({
        method: "PUT",
        url: "/api/todos",
        data: todo
      }).then(getTodos);
    }
  

});


// $(document).ready(function() {
//   // subscriptionContainer holds all of our posts
//   var blogContainer = $(".blog-container");
//   var postCategorySelect = $("#category");
//   // Click events for the edit and delete buttons
//   $(document).on("click", "button.delete", handlePostDelete);
//   $(document).on("click", "button.edit", handlePostEdit);
//   postCategorySelect.on("change", handleCategoryChange);
//   var posts;

//   // This function grabs posts from the database and updates the view
//   function getPosts(category) {
//     var categoryString = category || "";
//     if (categoryString) {
//       categoryString = "/category/" + categoryString;
//     }
//     $.get("/api/posts" + categoryString, function(data) {
//       console.log("Posts", data);
//       posts = data;
//       if (!posts || !posts.length) {
//         displayEmpty();
//       }
//       else {
//         initializeRows();
//       }
//     });
//   }
