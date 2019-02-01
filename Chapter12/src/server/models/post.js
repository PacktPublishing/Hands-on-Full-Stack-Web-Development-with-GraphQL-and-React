'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    text: DataTypes.TEXT,
    userId:  DataTypes.INTEGER,
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User);
  };
  return Post;
};