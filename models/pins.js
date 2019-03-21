module.exports = function(sequelize, DataTypes) {
    var Pin = sequelize.define("Pin", {
      user_id: DataTypes.INTEGER,
      symbol: DataTypes.STRING,
      date: DataTypes.STRING,
      text: DataTypes.TEXT
    });
    return Pin;
  };
  