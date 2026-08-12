const express = require('express');
const axios = require('axios');
const InstagramUser = require('../models/auth.model');
const authMiddleware = require("../middleware/authMiddleware");

require('dotenv').config()
const router = express.Router();

router.get('/login', (req, res) => {
  const appId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

  const authUrl =
    `https://www.instagram.com/oauth/authorize` +
    `?enable_fb_login=0` +
    `&force_authentication=1` +
    `&client_id=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments`;

  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {

  const { code, error, error_description } = req.query;

  if (error) {
    return res.status(400).json({
      success: false,
      error,
      description: error_description,
    });
  }

  if (!code) {
    return res.status(400).json({
      success: false,
      error: "Authorization code is missing",
    });
  }

  try {
    // Exchange authorization code for access token
    const formData = new URLSearchParams();

    formData.append("client_id", process.env.INSTAGRAM_APP_ID);
    formData.append("client_secret", process.env.INSTAGRAM_APP_SECRET);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", process.env.INSTAGRAM_REDIRECT_URI);
    formData.append("code", code);

    const tokenResponse = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.user_id;

    // Fetch Instagram profile
    const profileResponse = await axios.get(
      `https://graph.instagram.com/v23.0/me`,
      {
        params: {
          fields: "id,username,account_type,user_id",
          access_token: accessToken,
        },
      }
    );


    const profile = profileResponse.data;
    const webhookAccountId = profile.user_id;

    const instagramUser = await InstagramUser.findOneAndUpdate(
      { instagramId: profile.id },
      {
        instagramId: profile.id,
        username: profile.username,
        accountType: profile.account_type,
        accessToken,
        webhookAccountId: profile.user_id,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const jwt = require("jsonwebtoken");

    console.log("JWT", process.env.JWT_SECRET)
    const token = jwt.sign(
      {
        userId: instagramUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(
      `${process.env.FRONTEND_URL}/post`
    );

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

router.get('/verify', (req, res) => {
  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  const isValidFacebookAppId = /^\d+$/.test(appId);

  res.json({
    appId: appId,
    isValidFacebookAppId: isValidFacebookAppId,
    isAllNumbers: /^\d+$/.test(appId),
    length: appId?.length || 0,
    hasAppSecret: !!appSecret,
    message: isValidFacebookAppId ?
      'Valid Facebook App ID!' :
      'noInvalid! Get your Facebook App ID from https://developers.facebook.com/apps/',
    note: 'This should be your FACEBOOK APP ID (all numbers), not an Instagram App ID'
  });
});

router.post("/subscribe", async (req, res) => {
  try {
    const { accessToken } = req.body;

    const response = await axios.post(
      "https://graph.instagram.com/v23.0/me/subscribed_apps",
      null,
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await InstagramUser.findById(req.userId).select(
      "instagramId username accountType"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;