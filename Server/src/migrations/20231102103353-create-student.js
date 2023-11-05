'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      preschool_id: {
        type: Sequelize.INTEGER
      },
      class_name: {
        type: Sequelize.STRING
      },
      student_name: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      CPR: {
        type: Sequelize.INTEGER
      },
      contact_number1: {
        type: Sequelize.INTEGER
      },
      contact_number2: {
        type: Sequelize.INTEGER
      },
      guardian_name: {
        type: Sequelize.STRING
      },
      enrollment_date: {
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
    await queryInterface.dropTable('Students');
  }
};