module.exports = function(sequelize, DataTypes) {
  var Pin = sequelize.define("Pin", {
    date: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    graphSymbol: DataTypes.STRING
  });
  return Pin;
};
