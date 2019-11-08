'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('like', 'c_id', 'channel_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('like', 'channel_id', 'c_id');
  }
};
