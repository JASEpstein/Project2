$(".carousel").carousel();

// // Get references to page elements
// var $cartText = $("#cart-text");
// // var $cartDescription = $("#cart-description");
// var $addBtn = $(".add");
// var $itemList = $("#item-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   saveItem: function(subscription) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/subscriptions",
//       data: JSON.stringify(subscriptions)
//     });
//   },
//   getItem: function() {
//     return $.ajax({
//       url: "api/subscriptions",
//       type: "GET"
//     });
//   },
//   deleteItem: function(id) {
//     return $.ajax({
//       url: "api/subscriptions/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshItem = function() {
//   API.getItem().then(function(data) {
//     var $cartItems = data.map(function(subscriptions) {
//       var $a = $("<a>")
//         .text(subscriptions.text)
//         .attr("href", "/cart/" + subscriptions.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": subscription.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $itemList.empty();
//     $itemList.append($cartItems);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var cart = {
//     quantity: $cartText.val().trim()
//     // text: $cartText.val().trim(),
//     // description: $cartDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("");
//     return;
//   }

//   API.saveItems(subscriptions).then(function() {
//     refreshitems();
//   });

//   $cartText.val("");
//   // $cartDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
