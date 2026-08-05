// src/routes/user.routes.ts
import express, { Request, Response } from 'express';
import User from '../models/user.model';

const router = express.Router();

// POST /users - Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { instagramId, username, accessToken, trialEndsAt, subscriptionEndsAt } = req.body;

    // Check required fields
    if (!instagramId || !username || !accessToken || !trialEndsAt) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: instagramId, username, accessToken, trialEndsAt',
      });
    }

    // Create user
    const user = new User({
      instagramId,
      username,
      accessToken,
      trialEndsAt: new Date(trialEndsAt),
      subscriptionEndsAt: subscriptionEndsAt ? new Date(subscriptionEndsAt) : undefined,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error: any) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User with this instagramId already exists',
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Handle other errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;