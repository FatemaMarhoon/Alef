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
};

module.exports = ApplicationEvaluationController;