'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    trailId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.user);
    models.comment.belongsTo(models.trail);
  };
  return comment;
};