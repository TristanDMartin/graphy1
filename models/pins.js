module.exports = function(sequelize, DataTypes) {
    var Pin = sequelize.define("Pin", {
      graph_id: DataTypes.INTEGER,
      url: DataTypes.STRING,
      notes: DataTypes.TEXT
    });
    return Pin;
  };
  