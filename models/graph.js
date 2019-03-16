module.exports = function(sequelize, DataTypes) {
    var Graph = sequelize.define("Graph", {
      user_id: DataTypes.INTEGER,
      stock: DataTypes.STRING
    });
    return Graph;
  };
  