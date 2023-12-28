const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Evaluation = require('../models/application_evaluation')(sequelize, DataTypes);
const Application = require('../models/preschool_application')(sequelize, DataTypes);

Evaluation.belongsTo(Application, { foreignKey: 'application_id' });

const ApplicationEvaluationController = {

  async createEvaluation(req, res) {
    try {
      const {
        color_size_recognition,
        belongings_memory,
        task_completion,
        application_id,
        total_mark,
        letter_number_distinction,
        stimuli_discrimination,
        auditory_memory,
        quick_responses,
        sustained_attention,
        environmental_perception,
        quick_comprehension,
        math_problem_solving,
        quranic_verses_recall,
        first_time_attention,
        focus_on_significant_stimuli,
      } = req.body;

      // Validate each field
      if (color_size_recognition === undefined || color_size_recognition === null) {
        return res.status(400).json({ message: "color_size_recognition is required." });
      }
      if (belongings_memory === undefined || belongings_memory === null) {
        return res.status(400).json({ message: "belongings_memory is required." });
      }
      if (task_completion === undefined || task_completion === null) {
        return res.status(400).json({ message: "task_completion is required." });
      }
      if (application_id === undefined || application_id === null) {
        return res.status(400).json({ message: "application_id is required." });
      }
      if (total_mark === undefined || total_mark === null) {
        return res.status(400).json({ message: "total_mark is required." });
      }
      if (letter_number_distinction === undefined || letter_number_distinction === null) {
        return res.status(400).json({ message: "letter_number_distinction is required." });
      }
      if (stimuli_discrimination === undefined || stimuli_discrimination === null) {
        return res.status(400).json({ message: "stimuli_discrimination is required." });
      }
      if (auditory_memory === undefined || auditory_memory === null) {
        return res.status(400).json({ message: "auditory_memory is required." });
      }
      if (quick_responses === undefined || quick_responses === null) {
        return res.status(400).json({ message: "quick_responses is required." });
      }
      if (sustained_attention === undefined || sustained_attention === null) {
        return res.status(400).json({ message: "sustained_attention is required." });
      }
      if (environmental_perception === undefined || environmental_perception === null) {
        return res.status(400).json({ message: "environmental_perception is required." });
      }
      if (quick_comprehension === undefined || quick_comprehension === null) {
        return res.status(400).json({ message: "quick_comprehension is required." });
      }
      if (math_problem_solving === undefined || math_problem_solving === null) {
        return res.status(400).json({ message: "math_problem_solving is required." });
      }
      if (quranic_verses_recall === undefined || quranic_verses_recall === null) {
        return res.status(400).json({ message: "quranic_verses_recall is required." });
      }
      if (first_time_attention === undefined || first_time_attention === null) {
        return res.status(400).json({ message: "first_time_attention is required." });
      }
      if (focus_on_significant_stimuli === undefined || focus_on_significant_stimuli === null) {
        return res.status(400).json({ message: "focus_on_significant_stimuli is required." });
      }

      // Create the evaluation if all validations pass
      const newEvaluation = await Evaluation.create(req.body);

      return res.status(201).json({
        message: 'Evaluation created successfully',
        evaluation: newEvaluation,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error while saving the evaluation: ' + error.message });
    }
  },


  async getEvaluationById(req, res) {
    const { id } = req.params;
    try {
      const evaluation = await Evaluation.findByPk(id, {
        include: Application
      });
      if (!evaluation) {
        return res.status(404).json({ message: 'Evaluation not found' });
      }
      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error while retrieving the evaluation: ' + error.message });
    }
  },

  async updateEvaluation(req, res) {
    const { id } = req.params;
    try {
      const [updatedCount] = await Evaluation.update(req.body, {
        where: { id }
      });
      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Evaluation not found for updating' });
      }
      return res.json({ message: 'Evaluation updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error while updating the evaluation: ' + error.message });
    }
  },

  async deleteEvaluation(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Evaluation.destroy({
        where: { id }
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'Evaluation not found for deletion' });
      }
      res.json({ message: 'Evaluation deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error while deleting the evaluation: ' + error.message });
    }
  },
};

module.exports = ApplicationEvaluationController;
