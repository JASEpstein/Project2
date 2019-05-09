module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Category;
};
