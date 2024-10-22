const { DataTypes } = require('sequelize');
const sequelize = require('../config/seq');
const admin = require('../config/firebase.config')
const auth = admin.auth();
const EmailsManager = require('./EmailsManager')

const Preschool = require('../models/preschool')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);

Preschool.hasMany(User, { foreignKey: 'preschool_id' });
User.belongsTo(Preschool, { foreignKey: 'preschool_id' });

const UsersController = {


  getCurrentUser: async (req, res) => {
    let user_id = null;

    const token = req.get("authorization");
    if (token) {
      const tokenParts = token.split(' ');

      if (tokenParts.length === 2) {
        const tokenValue = tokenParts[1];

        try {
          const claims = await admin.auth().verifyIdToken(tokenValue);
          user_id = claims['dbId'];
        } catch (error) {
          console.error('Error verifying token:', error);
          res.status(401).json({ message: 'Invalid token' });
          return;
        }
      }
    }

    return user_id;
  },

  async getAllUsers(req, res) {
    const preschool = req.query.preschool;
    try {
      if (preschool) {
        const users = await User.findAll({
          where: { preschool_id: preschool, role_name:"" }
        });
        return res.status(200).json(users);
      }
      else {
        const users = await User.findAll();
        return res.status(200).json(users);
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

  //to create users by admin and create user once preschool request approved
  async createUser(req, res) {
    try {
      // Extract user data from the request body
      var { email, password, preschool_id, role_name, name } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({ message: "Email is Required" });
      }

      if (!name) {
        return res.status(400).json({ message: "Name is Required" });
      }

      if (!role_name) {
        return res.status(400).json({ message: "Role is Required" });
      }

      // Handle password based on role
      if (role_name === 'Parent' && !password) {
        return res.status(400).json({ message: "Password is Required" });
      } else if (['Admin', 'Staff', 'Teacher'].includes(role_name)) {
        if (!preschool_id) {
          return res.status(400).json({ message: "Preschool is Required" });
        }
        //generate random password
        password = generatePassword();
        console.log(password)
      }
      else if (['Super Admin'].includes(role_name)) {
        //generate random password
        password = generatePassword();
      }

      // Create Firebase user with validated data
      await createFirebaseUser(email, password, name, role_name, preschool_id).then(async () => {
        // Create local user record with validated data
        const createdUser = await User.create({ email, preschool_id, role_name, name });

        //store db id into firebase user
        const uid = (await auth.getUserByEmail(email)).uid;
        await auth.setCustomUserClaims(uid, { 'dbId': createdUser.id });

        // Send successful response with created user data
        return res.status(201).json({ message: 'User created successfully', createdUser });
      });

    } catch (error) {
      // Handle errors and send error response
      console.error(error);
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
        if (role_name) dbUser.set({ role_name: role_name });
        const currentClaims = firebaseUser.customClaims;
        const updatedClaims = {
          ...currentClaims,
          role: role_name,
        };
        if (role_name) await admin.auth().setCustomUserClaims(firebaseUser.uid, updatedClaims);
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
    const { id } = req.params;
    try {
      // Get firebase user 
      const userObject = await User.findByPk(id);
      const dbSuccess = await User.destroy({ where: { id: id } });
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
  },

  async updateAll(req, res) {
    try {
      const users = await User.findAll();
      for (const user of users) {

        const uid = (await auth.getUserByEmail(user.email)).uid;
        const currentClaims = (await auth.getUser(uid)).customClaims;
        const updatedClaims = {
          ...currentClaims,
          preschool_id: user.preschool_id,
          role: user.role_name,
          dbId: user.id
        };

        await auth.setCustomUserClaims(uid, updatedClaims);
        const stored = (await auth.getUser(uid)).customClaims;
        console.log(stored)
      }

      res.status(200).json({ message: 'User records updated successfully.' });
    } catch (error) {
      console.error('Error updating user records:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async superAdminSeeding(req, res) {
    try {
      await createFirebaseUser('', '', '', '')
    } catch (error) {

    }
  }
};

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
        // Generate reset password link and send it via email for accounts created on behalf of users
        if (role_name != "Parent") {
          auth.generatePasswordResetLink(email)
            .then((link) => {
              EmailsManager.sendCustomPasswordResetEmail(email, name, link);
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

function generatePassword() {
  // Define the characters to include in the password
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  // Set the desired password length
  const passwordLength = 12;

  // Generate a random string of characters
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  return password;
}
module.exports = UsersController;
