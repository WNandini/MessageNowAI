const InstagramUser = require("../models/instagramUser.model");
const { getUserPosts } = require("../services/instagram.service");

const getPosts = async (req, res) => {
  try {
    const user = await InstagramUser.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Instagram user not found",
      });
    }

    const result = await getUserPosts(
      user.instagramId,
      user.accessToken
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Get Instagram posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Instagram posts",
    });
  }
};

module.exports = {
  getPosts,
};