'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('upvote', 'createdAt', 'created_at');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('upvote', 'created_at', 'createdAt');
  }
};
