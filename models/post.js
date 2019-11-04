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
    post.belongsTo(models.channel, { foreignKey: 'creator', onDelete: 'cascade'});
    post.hasMany(models.comment, { as: 'comments'});
    post.hasMany(models.like, { as: 'likes'});
  };
  return post;
};