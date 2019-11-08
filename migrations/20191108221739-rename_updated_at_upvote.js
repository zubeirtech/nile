'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('upvote', 'updatedAt', 'updated_at');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('upvote', 'updated_at', 'updatedAt');
  }
};
