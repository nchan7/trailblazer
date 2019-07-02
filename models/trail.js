'use strict';
module.exports = (sequelize, DataTypes) => {
  const trail = sequelize.define('trail', {
    name: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE,
    number: DataTypes.INTEGER
  }, {});
  trail.associate = function(models) {
    // associations can be defined here
    models.trail.belongsToMany(models.user, {through: "usersTrails"});
    models.trail.hasMany(models.comment);
  };
  return trail;
};