'use strict';
module.exports = (sequelize, DataTypes) => {
  const trail = sequelize.define('trail', {
    name: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE
  }, {});
  trail.associate = function(models) {
    // associations can be defined here
  };
  return trail;
};