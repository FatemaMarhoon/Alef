const { DataTypes, Model } = require('sequelize');
const db = require('../config/seq'); // Use the appropriate Sequelize connection

module.exports = (sequelize, DataTypes) => {
  const Student_Evaluation = sequelize.define('Student_Evaluation', {
    neatness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attentiveness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    communication: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emotional_intelligence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comprehension: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grammatical_competence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oral_communication: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sound_recognition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reading_proficiency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mathematics_proficiency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    islamic: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exploration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arabic_writing_skills: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arabic_reading_skills: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arabic_listening_speaking_skills: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    global_citizenship: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    behavior: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    punctuality: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confidence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    independence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Student_Evaluation;
};
