'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('like', 'p_id', 'post_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('like', 'post_id', 'p_id');
  }
};
