'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    c_id: {
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