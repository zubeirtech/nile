'use strict';
module.exports = (sequelize, DataTypes) => {
  const upvote = sequelize.define('upvote', {
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
  upvote.associate = function(models) {
    // associations can be defined here
  };
  return upvote;
};