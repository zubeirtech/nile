'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('comment', 'p_id', 'post_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('comment', 'post_id', 'p_id');
  }
};
