'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      preschool_id: {
        type: Sequelize.INTEGER
      },
      guardian_type: {
        type: Sequelize.STRING
      },
      application_status: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      student_name: {
        type: Sequelize.STRING
      },
      student_CPR: {
        type: Sequelize.INTEGER
      },
      guardian_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      student_DOB: {
        type: Sequelize.DATE
      },
      medical_history: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Applications');
  }
};