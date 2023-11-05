'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Student_Evaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      neatness: {
        type: Sequelize.INTEGER
      },
      attentiveness: {
        type: Sequelize.INTEGER
      },
      communication: {
        type: Sequelize.INTEGER
      },
      emotional_intelligence: {
        type: Sequelize.INTEGER
      },
      comprehension: {
        type: Sequelize.INTEGER
      },
      grammatical_competence: {
        type: Sequelize.INTEGER
      },
      oral_communication: {
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      sound_recognition: {
        type: Sequelize.INTEGER
      },
      reading_proficiency: {
        type: Sequelize.INTEGER
      },
      mathematics_proficiency: {
        type: Sequelize.INTEGER
      },
      islamic: {
        type: Sequelize.INTEGER
      },
      participation: {
        type: Sequelize.INTEGER
      },
      exploration: {
        type: Sequelize.INTEGER
      },
      arabic_writing_skills: {
        type: Sequelize.INTEGER
      },
      arabic_reading_skills: {
        type: Sequelize.INTEGER
      },
      arabic_listening_speaking_skills: {
        type: Sequelize.INTEGER
      },
      global_citizenship: {
        type: Sequelize.INTEGER
      },
      behavior: {
        type: Sequelize.INTEGER
      },
      punctuality: {
        type: Sequelize.INTEGER
      },
      confidence: {
        type: Sequelize.INTEGER
      },
      independence: {
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
    await queryInterface.dropTable('Student_Evaluations');
  }
};