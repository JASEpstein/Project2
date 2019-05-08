module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {}
    }
  });
  return Category;
};
