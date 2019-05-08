module.exports = function Cart(oldcart) {
  //grabs the values from preexisting cart and assigns values
  //if there is no previous cart then it will create one.
  this.items = oldcart.items;
  this.totalQty = oldcart.totalQty;
  this.totalPrice = oldcart.totalPrice;

  //allows user to add item to the cart
  this.add = function(item, id) {
    //checks if this item or item group already exists in the cart
    //if item is already in the cart then use the old id
    var storedItem = this.items[id];
    //if it does not then create a new one
    if (!storedItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    //increase qty by one
    storedItem.qty++;
    //adjust the price
    storedItem.price = storedItem.item.price * storedItem.qty;
    //update the total qty and price
    this.totalQty++;
    this.totalPrice += storedItem.price;
  };

  this.generatedArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
