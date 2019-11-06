'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'post',
      'meta', {
        type: Sequelize.JSONB,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'post',
      'meta'
    );
  }
};
