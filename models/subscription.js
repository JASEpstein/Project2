module.exports = function(sequelize, DataTypes) {
  var Subscription = sequelize.define("Subscription", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    number_of_items: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    premium: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    }
  });

  return Subscription;
};
