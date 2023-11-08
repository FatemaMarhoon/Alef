const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Application_Evaluation = sequelize.define('Application_Evaluation', {
    color_size_recognition: DataTypes.INTEGER,
    belongings_memory: DataTypes.INTEGER,
    task_completion: DataTypes.INTEGER,
    application_id: DataTypes.INTEGER,
    total_mark: DataTypes.INTEGER,
    letter_number_distinction: DataTypes.INTEGER,
    stimuli_discrimination: DataTypes.INTEGER,
    auditory_memory: DataTypes.INTEGER,
    quick_responses: DataTypes.INTEGER,
    sustained_attention: DataTypes.INTEGER,
    environmental_perception: DataTypes.INTEGER,
    quick_comprehension: DataTypes.INTEGER,
    math_problem_solving: DataTypes.INTEGER,
    quranic_verses_recall: DataTypes.INTEGER,
    first_time_attention: DataTypes.INTEGER,
    focus_on_significant_stimuli: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Application_Evaluation',
  });

  return Application_Evaluation;
};
