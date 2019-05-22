// var Subscription = require("./subscription");

module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define("Cart", {
    UserId: {
      type: DataTypes.INTEGER,
      references: { model: "user" }
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      references: { model: "subscription" }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: [1, 50]
      }
    }
  });

  // console.log(sequelize.models);
  // Cart.belongsTo(Subscription);

  return Cart;
};

/*
{
      classMethods: {
        associate: function(models) {
          Cart.belongsto(models.Subscription, {
            //onDelete: "cascade"
          });
          Cart.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
*/
