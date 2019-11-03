'use strict';
module.exports = (sequelize, DataTypes) => {
  const channel = sequelize.define('channel', {
    channelname: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    biography: DataTypes.STRING(5000),
    image_url: DataTypes.STRING(1000),
    password: DataTypes.STRING
  }, { freezeTableName: true, underscored: true});
  channel.associate = function(models) {
    channel.hasMany(models.post, { as: 'posts'})
  };
  return channel;
};