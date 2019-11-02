'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    author: {
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
    // associations can be defined here
  };
  return comment;
};