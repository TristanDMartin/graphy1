module.exports = function(sequelize, DataTypes) {
    var Stock = sequelize.define("Stock", {
      symbol: DataTypes.STRING,
      name: DataTypes.STRING,
      IPOyear: DataTypes.INTEGER,
      sector: DataTypes.STRING,
      industry: DataTypes.STRING
    });
    return Stock;
  };
  