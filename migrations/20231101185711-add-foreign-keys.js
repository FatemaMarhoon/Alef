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
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Add an index to the preschool_id column
    await queryInterface.addIndex('Users', ['preschool_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'preschool_id');
  }
};
