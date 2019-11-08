'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('comment', 'author', 'channel_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('comment', 'channel_id', 'author');
  }
};
