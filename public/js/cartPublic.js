$(".addItem").on("click", function(event) {
  event.preventDefault();
  //grabs the id of the item selected
  var id = $(this).data("id");

  //send the POST request.
  $.ajax("/api/carts", {
    type: "POST",
    data: newSubscription
  }).then(function() {
    console.log("Item has been added to your cart!");
    //redirect to shopping cart.
    response.redirect("/cart");
  });
});
