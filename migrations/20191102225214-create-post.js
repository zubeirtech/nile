'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fe_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      creator: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'channel',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: { type: Sequelize.STRING(5000) },
      thumbnail_url: { type: Sequelize.STRING },
      video_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('post');
  }
};