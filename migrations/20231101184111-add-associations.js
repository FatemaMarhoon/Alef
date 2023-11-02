'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'preschool_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preschools',
        key: 'preschool_id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'preschool_id');
  }
};
