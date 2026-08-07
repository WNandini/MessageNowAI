// routes/user.js
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - instagramId
 *               - username
 *               - accessToken
 *               - trialEndsAt
 *             properties:
 *               instagramId:
 *                 type: string
 *                 example: "123456"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               accessToken:
 *                 type: string
 *                 example: "token123"
 *               trialEndsAt:
 *                 type: string
 *                 example: "2026-09-01T00:00:00.000Z"
 *               subscriptionEndsAt:
 *                 type: string
 *                 example: "2026-10-01T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User exists
 */
router.post('/users', async (req, res) => {
  try {
    const { instagramId, username, accessToken, trialEndsAt, subscriptionEndsAt } = req.body;

    if (!instagramId || !username || !accessToken || !trialEndsAt) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const user = new User({
      instagramId,
      username,
      accessToken,
      trialEndsAt: new Date(trialEndsAt),
      subscriptionEndsAt: subscriptionEndsAt ? new Date(subscriptionEndsAt) : null,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created',
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-accessToken');
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-accessToken');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;