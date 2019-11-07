'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('post', 'creator', 'channel_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('post', 'channel_id', 'creator');
  }
};
