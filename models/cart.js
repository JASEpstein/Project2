module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define(
    "Cart",
    {
      UserId: DataTypes.INTEGER,
      subscriptionId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
          len: [1, 50]
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Cart.belongsto(models.subscription, {
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
  );
  return Cart;
};
