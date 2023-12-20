const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/seq');

const Evaluation = require('../models/application_evaluation')(sequelize, DataTypes);
const Application = require('../models/preschool_application')(sequelize, DataTypes);

Evaluation.belongsTo(Application, { foreignKey: 'application_id' });

const ApplicationEvaluationController = {
  async getAllEvaluations(req, res) {
    try {
      const evaluations = await Evaluation.findAll({
        include: Application
      });
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createEvaluation(req, res) {
    try {
      const newEvaluation = await Evaluation.create(req.body);
      res.status(201).json({
        message: 'Evaluation created successfully',
        evaluation: newEvaluation,
      });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create a new evaluation. Please check your request data.', message: error.message });
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
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while retrieving the evaluation', message: error.message });
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
      res.json({ message: 'Evaluation updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while updating the evaluation', message: error.message });
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
      res.status(500).json({ message: 'Internal server error while deleting the evaluation', message: error.message });
    }
  },
};

module.exports = ApplicationEvaluationController;
