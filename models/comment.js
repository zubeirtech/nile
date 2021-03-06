'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
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
    comment: {
      type: DataTypes.STRING(6000),
      allowNull: false
    }
  }, { freezeTableName: true, underscored: true });
  comment.associate = function(models) {
    comment.belongsTo(models.channel, { foreignKey: 'channel_id', as: 'channel'})
  };
  return comment;
};