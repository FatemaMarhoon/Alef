const { Op, DataTypes, fn, col } = require('sequelize');
const { literal } = require('sequelize');
const sequelize = require('../config/seq');

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Address = require('../models/address')(sequelize, DataTypes);
const Student = require('../models/student')(sequelize, DataTypes);
const Media = require('../models/preschool_media')(sequelize, DataTypes);
const FilesManager = require('./FilesManager');
const { verifyPreschool } = require('../config/token_validation');
const UsersController = require('./UsersController');
const GradesController = require('./GradeCapacityController');


Preschool.hasMany(Media, { foreignKey: 'preschool_id' });
Preschool.hasMany(User, { foreignKey: 'preschool_id' });
Address.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasOne(Address, { foreignKey: 'preschool_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });
Preschool.hasMany(Student, { foreignKey: 'preschool_id' });

const PreschoolController = {

  async getAllAppPreschools(req, res) {
    const searchExpression = req.query.preschool_name;
    const location = req.query.location;
    const age = req.query.age;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    try {
      let finalList = [];
      let whereCondition = [];

      if (searchExpression) {
        whereCondition.push({
          preschool_name: {
            [Op.like]: `%${searchExpression}%`,
          },
        });
      }

      if (location) {
        whereCondition.push({
          '$Address.area$': {
            [Op.like]: `%${location}%`,
          },
        });
      }

      if (age) {
        whereCondition.push({
          minimum_age: {
            [Op.lte]: age,
          },
        });
        whereCondition.push({
          maximum_age: {
            [Op.gte]: age,
          },
        });
      }
      if (latitude && longitude) {
        const distance = 10; // within 10 kilometers

        const [results, metadata] = await sequelize.query(
          `CALL GetPreschoolsByLocation(:latitude, :longitude, :distance)`,
          {
            replacements: { latitude, longitude, distance },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        const transformedResults = Object.values(results);
        const preschoolsWithLogos = await Promise.all(
          transformedResults.map(async (preschool) => {
            if (preschool.logo) {
              preschool.logo = await FilesManager.generateSignedUrl(preschool.logo);
            }
            return preschool;
          })
        );

        finalList = preschoolsWithLogos;
      }
      else {
        const preschools = await Preschool.findAll({
          where: {
            [Op.and]: whereCondition,
          },
          include: [{ model: Address, as: 'Address' }],
        });

        const preschoolsWithLogos = await Promise.all(
          preschools.map(async (preschool) => {
            if (preschool.logo) {
              preschool.logo = await FilesManager.generateSignedUrl(preschool.logo);
            }
            return preschool;
          })
        );

        finalList = preschoolsWithLogos;
      }

      // only return preschools ready to accept applications (they have grades)
      let filtered = [];
      for (const pre of finalList){
        const result = await GradesController.gradesExist(pre.id);
        console.log(result);
        if (result == true){
          filtered.push(pre);
        }
      }


      return res.status(200).json(filtered);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllPreschools(req, res) {
    try {
        const preschools = await Preschool.findAll({
          include: [{ model: Address, as: 'Address' }],
        });

        const preschoolsWithLogos = await Promise.all(
          preschools.map(async (preschool) => {
            if (preschool.logo) {
              preschool.logo = await FilesManager.generateSignedUrl(preschool.logo);
            }
            return preschool;
          })
        );


      return res.status(200).json(preschoolsWithLogos);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getPreschoolById(req, res) {
    const preschool_id = req.params.id;
    try {
      const preschool = await Preschool.findByPk(preschool_id, {
        include: [{ model: Address, as: "Address" }, { model: Media, as: "Preschool_Media" }]
      });
      if (preschool) {
        if (preschool.logo)
          preschool.logo = await FilesManager.generateSignedUrl(preschool.logo);
        if (preschool.Preschool_Media) {
          // Replace file field with file URL in each media object
          const mediaWithUrls = await Promise.all(preschool.Preschool_Media.map(async (mediaObj) => {
            const fileURL = await FilesManager.generateSignedUrl(mediaObj.file);
            return { ...mediaObj.toJSON(), file: fileURL };
          }));

          const updatedList = { ...preschool.toJSON() };
          updatedList.Preschool_Media = mediaWithUrls;
          return res.status(200).json(updatedList);
        }
        return res.status(200).json(preschool);
      }
      else {
        return res.status(404).json({ message: "Preschool Not Found." });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  },

  async searchPreschoolByName(req, res) {
    const searchExpression = req.query.params.name;
    try {
      const preschools = await Preschool.findOne({
        where: {
          name: {
            [Op.eq]: searchExpression
          }
        },
        include: Address
      });
      res.json(preschools);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while retrieving preschools.' });
    }
  },

  async createPreschool(req, res) {
    try {
      const preschoolData = req.body;
      // Calculate subscription_expiry_date as 1 year from createdAt
      const createdAt = new Date();
      const subscriptionExpiryDate = new Date(createdAt);
      subscriptionExpiryDate.setFullYear(subscriptionExpiryDate.getFullYear() + 1);

      // Add subscription_expiry_date to preschoolData
      preschoolData.subscription_expiry_date = subscriptionExpiryDate;

      const newPreschool = await Preschool.create(preschoolData);
      return res.status(201).json({
        message: 'Preschool created successfully',
        preschool: newPreschool,
      });
    } catch (error) {
      return res.status(400).json({ message: 'Failed to create a new preschool. Please check your request data.', error: error.message });
    }
  },

  async updatePreschool(req, res) {
    const preschoolId = req.params.id;
    const updatedPreschoolData = req.body;
    try {

      const preschool = await Preschool.findByPk(preschoolId);
      if (preschool) {
        // access control 
        if (await UsersController.getCurrentUserRole(req) == "Admin" && await verifyPreschool(preschoolId, req) == false) {
          return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
        }

        //handle upload file for logo 
        if (req.files['logoFile']) {
          const logo_url = await FilesManager.upload(req.files['logoFile'][0]);
          updatedPreschoolData.logo = logo_url;
        }

        preschool.set(updatedPreschoolData);
        await preschool.save();

        res.json({ message: 'Preschool updated successfully', preschool: preschool });
      } else {
        res.status(404).json({ message: 'Preschool not found or no changes made' });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error while updating the preschool.' });
    }
  },

  async deletePreschool(req, res) {
    const preschoolId = req.params.id;
    try {
      const preschool = await Preschool.findByPk(preschoolId);
      if (preschool) {
        // access control 
        if (await UsersController.getCurrentUserRole(req) == "Admin" && await verifyPreschool(preschoolId, req) == false) {
          return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
        }
      }
      const success = await Preschool.destroy({ where: { id: preschoolId } });

      if (success) {
        res.json({ message: 'Preschool deleted successfully' });
      } else {
        res.status(404).json({ message: 'Preschool not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error while deleting the preschool.' });
    }
  },

  async updatePreschoolAddress(req, res) {
    const addressId = req.params.id;
    const updatedAddress = req.body;
    try {
      const address = await Address.findByPk(addressId);

      if (address) {
        // access control 
        if (await UsersController.getCurrentUserRole(req) == "Admin" && await verifyPreschool(address.preschool_id, req) == false) {
          return res.status(403).json({ message: "Access Denied! You're Unauthorized To Perform This Action." });
        }

        address.set(updatedAddress);
        await address.save();

        res.json({ message: 'Address updated successfully', address: updatedAddress });
      } else {
        res.status(404).json({ message: 'Address not found or no changes made' });
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'Internal server error while updating the preschool.' });
    }
  },
};

module.exports = PreschoolController;
