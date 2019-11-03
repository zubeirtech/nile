'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'channel',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'channel',
      'password'
    );
  }
};
