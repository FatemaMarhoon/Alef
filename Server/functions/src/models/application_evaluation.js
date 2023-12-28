const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Application_Evaluation = sequelize.define('Application_Evaluation', {
    color_size_recognition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    belongings_memory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_completion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_mark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    letter_number_distinction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stimuli_discrimination: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auditory_memory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quick_responses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sustained_attention: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    environmental_perception: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quick_comprehension: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    math_problem_solving: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quranic_verses_recall: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_time_attention: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    focus_on_significant_stimuli: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Application_Evaluation',
  });

  return Application_Evaluation;
};
