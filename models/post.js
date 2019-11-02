'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    fe_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'channel',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING(5000),
    thumbnail_url: DataTypes.STRING,
    video_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true, underscored: true});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};