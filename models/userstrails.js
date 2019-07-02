'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersTrails = sequelize.define('usersTrails', {
    userId: DataTypes.INTEGER,
    trailId: DataTypes.INTEGER
  }, {});
  usersTrails.associate = function(models) {
    // associations can be defined here
  };
  return usersTrails;
};