$(document).on("load", function() {
  alert("You fucker");
});

$(".carousel").carousel();

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$("#add-account").on("click", function(event) {
  event.preventDefault();

  console.log("Button click worked");

  var newAccount = {
    firstName: $("#firstName")
      .val()
      .trim(),
    lastName: $("#lastName")
      .val()
      .trim(),
    street: $("#streetName")
      .val()
      .trim(),
    city: $("#cityName")
      .val()
      .trim(),
    state: $("#stateName")
      .val()
      .trim(),
    zip: $("#zip")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    phone: $("#phoneNumber")
      .val()
      .trim(),
    accountKey: $("#password")
      .val()
      .trim()
  };

  if (
    newAccount.accountKey.length > 0 &&
    newAccount.phone.length > 0 &&
    newAccount.email.length > 0 &&
    newAccount.zip.length > 0 &&
    newAccount.state.length > 0 &&
    newAccount.city.length > 0 &&
    newAccount.street.length > 0 &&
    newAccount.lastName.length > 0 &&
    newAccount.firstName.length > 0
  ) {
    $.ajax({
      type: "post",
      url: "/signup",
      data: newAccount
    }).then(function(data) {
      window.location.href = "/";
    });
  } else {
    console.log("Please fill out the entire form");
    $("#create-err-msg")
      .empty("")
      .text("Please fill out the entire form");
  }
});

$("#update-account").on("click", function(event) {
  event.preventDefault();

  var changeAccount = {
    firstName: $("#firstName")
      .val()
      .trim(),
    lastName: $("#lastName")
      .val()
      .trim(),
    street: $("#streetName")
      .val()
      .trim(),
    city: $("#cityName")
      .val()
      .trim(),
    state: $("#stateName")
      .val()
      .trim(),
    zip: $("#zip")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    phone: $("#phoneNumber")
      .val()
      .trim(),
    accountKey: $("#password")
      .val()
      .trim(),
    accountId: $("#account-number").attr("data-accountid")
  };

  $("#err-msg").empty("");

  if (
    changeAccount.accountId.length > 0 &&
    changeAccount.accountKey.length > 0 &&
    changeAccount.phone.length > 0 &&
    changeAccount.email.length > 0 &&
    changeAccount.zip.length > 0 &&
    changeAccount.state.length > 0 &&
    changeAccount.street.length > 0 &&
    changeAccount.firstName.length > 0 &&
    changeAccount.lastName.length > 0
  ) {
    $.ajax({
      type: "PUT",
      url:
        "/accounts/" + changeAccount.accountId + "/" + changeAccount.accountKey,
      data: changeAccount
    }).then(function() {
      console.log("Updated Account", changeAccount);

      location.reload();
    });
  } else {
    console.log("Please fill out entire form");
    $("#update-err-msg")
      .empty("")
      .text("Please fill out entire form");
  }
});

$("#delete-account").on("click", function(event) {
  event.preventDefault();
  $("#err-msg").empty();
  $("#delete-account-modal").modal("show");
});

$("#confirm-delete").on("click", function(event) {
  event.preventDefault();
  var deleteAccount = {
    accountId: $("#accountId")
      .val()
      .trim(),
    accountKey: $("#accountKey")
      .val()
      .trim()
  };
  console.log(deleteAccount);
  if (
    deleteAccount.accountId.length > 0 &&
    deleteAccount.accountKey.length > 0 &&
    deleteAccount.accountId.length > 0
  ) {
    $.ajax(
      "/accounts/" + deleteAccount.accountId + "/" + deleteAccount.accountKey,
      {
        type: "DELETE"
      }
    ).then(function() {
      console.log("Account deleted", deleteAccount.accountId);
      location.reload();
    });
  } else {
    console.log("fill out the entire form");
    $("#err-msg")
      .empty("")
      .text("fill out the entire form");
  }
});
