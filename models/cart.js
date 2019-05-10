module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define(
    "Cart",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 10]
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Cart.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Cart;
};

// module.exports = function Cart(oldcart) {
//   //grabs the values from preexisting cart and assigns values
//   //if there is no previous cart then it will create one.
//   this.items = oldcart.items;
//   this.totalQty = oldcart.totalQty;
//   this.totalPrice = oldcart.totalPrice;

//   //fnction that allows user to add item to the cart
//   this.add = function(item, id) {
//     //checks if this item or item group already exists in the cart
//     //if item is already in the cart then use the old id
//     var storedItem = this.items[id];
//     //if it does not then create a new one
//     if (!storedItem) {
//       storeItem = this.items[id] = { item: item, qty: 0, price: 0 };
//     }
//     //increase qty by one
//     storedItem.qty++;
//     //adjust the price
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     //update the total qty and price
//     this.totalQty++;
//     this.totalPrice += storedItem.item.price;
//   };

//   //function that allows users to remove an item from the cart
//   this.remove = function(id) {
//     //grabs the qty and price of the items at the item id
//     this.totalItems -= this.items[id].quantity;
//     this.totalPrice -= this.items[id].price;
//     //removes the item at id
//     delete this.items[id];
//   };

//   //function to read cart items as an array
//   this.itemsArray = function() {
//     //empty array to hold items
//     var arr = [];
//     //loop through and grab id for items
//     for (var id in this.items) {
//       //push value of items into the empty array
//       arr.push(this.items[id]);
//     }
//     //returns the array
//     return arr;
//   };
// };
