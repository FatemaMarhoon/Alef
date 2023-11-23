const { DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const admin = require('../config/firebase.config')
const auth = admin.auth();
const EmailsManager = require('./EmailsManager')

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);

Preschool.hasMany(User, { foreignKey: 'preschool_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });

function createFirebaseUser(email, password, name, role_name, preschool_id) {
  return new Promise((resolve, reject) => {
    auth.createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: name,
      disabled: false,
    })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        auth.setCustomUserClaims(userRecord.uid, { "role": role_name, "preschool_id": preschool_id })
        // Generate reset link and pass to smtp service to send it in the email
        if (role_name != "Parent"){
           auth.generatePasswordResetLink(email)
          .then((link) => {
            EmailsManager.sendCustomPasswordResetEmail(email, name, link);
            console.log('Password reset email sent:', link);
          })
          .catch((error) => {
            console.error('Error generating password reset link:', error);
          });
        }
        // Return a value indicating successful user creation
        resolve(true);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
        reject(error);
      });
  });
}

const UsersController = {

  async getAllUsers(req, res) {
    const preschool = req.query.preschool;
    console.log(req.query)
    try {
      if (preschool) {
        const users = await User.findAll({
          where: { preschool_id: preschool }
        });
        return res.json(users);
      }
      else {
        const users = await User.findAll();
        return res.json(users);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({
        where: { email: email }
      });
      if (user) {
        res.json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const user = await User.findOne({
          where: { email: email }
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
          const jsontoken = sign(user.toJSON(), "wmkd156skmx40zkm25s81zxc", { expiresIn: "1h" });
          return res.json({ message: "logged in successfully", jsontoken, user });
        }
        else if (user && !passwordMatch) {
          return res.status(404).json({ message: "Wrong password." });
        }
        else if (!user) {
          return res.status(404).json({ message: "User does not exist." });
        }
      }
      else if (!email) {
        return res.status(404).json({ message: "Email is empty." });
      }
      else if (!password) {
        return res.status(404).json({ message: "Password is empty." });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //to register parents in zainab's app
  async register(req, res) {
    //  PRESCHOOL SHOULD BE SET TO NULL AND ROLE TO PARENT (HERE)
    const { email, password, name } = req.body;
    const user = { email, password, name };
    try {
      if (user.email && user.password && user.name) {
        //find user 
        const userFound = await User.findOne({
          where: { email: email }
        });
        if (userFound) {
          return res.status(500).json({ message: "User already exists." })
        }
        // hash password
        user.password = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ email: user.email, password: user.password, role_name: "Parent", name: user.name });
        return res.status(201).json({ message: 'Parent registered successfully', createdUser });
      }
      else {
        return res.status(500).json({ message: "Incomplete information." })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },


  //to create users by admin and create user once preschool request approved
  async createUser(req, res) {
    const { email, password, preschool_id, role_name, name } = req.body;
    const user = { email, password, preschool_id, role_name, name };
    try {
      const firebaseResponse = await createFirebaseUser(email, password, name, role_name, preschool_id).then(async () => {
        const createdUser = await User.create({ email: user.email, password: password, preschool_id: user.preschool_id, role_name: user.role_name, name: user.name });
        return res.status(201).json({ message: 'User created successfully', createdUser });
      }) 
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, role_name, status } = req.body; //all are optional, only what has value should be updated
    try {
      // Get the user by id (firebase and db)
      const dbUser = await User.findByPk(id);
      const firebaseUser = await admin.auth().getUserByEmail(dbUser.email);

      //if user found in both, update both 
      if (dbUser && firebaseUser) {
        if (status) dbUser.set({ status: status });
        if (status == "Disabled") await admin.auth().updateUser(firebaseUser.uid, { disabled: true });
        if (status == "Enabled") await admin.auth().updateUser(firebaseUser.uid, { disabled: false });
        if (name) dbUser.set({ name: name });
        if (name) await admin.auth().updateUser(firebaseUser.uid, { displayName: name });
        if (role_name) dbUser.set({ name: name });
        if (role_name) await admin.auth().setCustomUserClaims(firebaseUser.uid, { role: role_name });
        await dbUser.save();
        return res.status(201).json({ message: "User updated successfully." });
      }
      else {
        return res.status(404).json({ message: "User not found" });
      }

    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    const {id} = req.params;
    try {
      // Get firebase user 
      const userObject = await User.findByPk(id);
      const dbSuccess = await User.destroy({where : {id : id}});
      //if user found in both, update both 
      if (dbSuccess) {
        await admin.auth().deleteUser((await admin.auth().getUserByEmail(userObject.email)).uid);
        return res.status(201).json({ message: "User deleted successfully." });
      }
      else {
        return res.status(404).json({ message: "User not found" });
      }

    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = UsersController;
