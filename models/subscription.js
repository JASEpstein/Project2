module.exports = function(sequelize, DataTypes) {
  var Subscription = sequelize.define("Subscription", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    number_of_items: DataTypes.STRING,
    premium: DataTypes.STRING,
    img: DataTypes.STRING
  });

  return Subscription;
};

/*module.exports = function(sequelize, DataTypes) {
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
};*/
