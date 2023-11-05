'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Application_Evaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      color_size_recognition: {
        type: Sequelize.INTEGER
      },
      belongings_memory: {
        type: Sequelize.INTEGER
      },
      task_completion: {
        type: Sequelize.INTEGER
      },
      application_id: {
        type: Sequelize.INTEGER
      },
      total_mark: {
        type: Sequelize.INTEGER
      },
      letter_number_distinction: {
        type: Sequelize.INTEGER
      },
      stimuli_discrimination: {
        type: Sequelize.INTEGER
      },
      auditory_memory: {
        type: Sequelize.INTEGER
      },
      quick_responses: {
        type: Sequelize.INTEGER
      },
      sustained_attention: {
        type: Sequelize.INTEGER
      },
      environmental_perception: {
        type: Sequelize.INTEGER
      },
      quick_comprehension: {
        type: Sequelize.INTEGER
      },
      math_problem_solving: {
        type: Sequelize.INTEGER
      },
      quranic_verses_recall: {
        type: Sequelize.INTEGER
      },
      first_time_attention: {
        type: Sequelize.INTEGER
      },
      focus_on_significant_stimuli: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Application_Evaluations');
  }
};