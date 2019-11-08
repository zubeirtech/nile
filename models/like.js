'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'channel',
        key: 'id'
      }
    },
  }, { freezeTableName: true, underscored: true });
  like.associate = function(models) {
    // associations can be defined here
  };
  return like;
};