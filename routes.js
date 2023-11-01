const express = require('express');
const { Op } = require('sequelize'); // Import the Op operator for querying
const User = require('./models/User'); // Import the User model
const Preschool = require('./models/preschool'); // Import the User model

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            // include: Preschool
        });
        console.log("route accessed");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users for preschool
router.get('/:preschool_id', async (req, res) => {
    const { preschool_id } = req.params;
    try {
        if (preschool_id) {
            const preschool = await Preschool.findOne({
                include: [{
                    model: User,
                    as: "Users"
                }],
                where: { preschool_id: preschool_id }
            });

            if (!preschool) {
                res.status(404).json({ message: 'Preschool not found' });
                return; // Exit the function early
            }

            const users = await preschool.getUsers(); // Use getUsers method
            res.json(users);
        } else {
            const users = await User.findAll();
            console.log("route accessed");
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// // Get user by email
// router.get('/:email', async (req, res) => {
//     const { email } = req.params;
//     try {
//         const user = await User.findOne({ where: { email } });
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Create a new user
router.post('/', async (req, res) => {
    const { email, preschool_id, role_name, name } = req.body;
    try {
        const user = await User.create({ email, preschool_id, role_name, name });
        res.json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user
router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const updatedUser = req.body;
    try {
        const [updatedCount] = await User.update(updatedUser, {
            where: { email },
        });
        if (updatedCount > 0) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
router.delete('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const deletedCount = await User.destroy({ where: { email } });
        if (deletedCount > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
