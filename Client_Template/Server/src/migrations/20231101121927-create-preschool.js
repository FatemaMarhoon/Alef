'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Preschools', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      preschool_id: {
        type: Sequelize.INTEGER
      },
      address_id: {
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.INTEGER
      },
      preschool_name: {
        type: Sequelize.STRING
      },
      plan_id: {
        type: Sequelize.STRING
      },
      subscription_expiry_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Preschools');
  }
};