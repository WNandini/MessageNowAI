const axios = require("axios");

const sendDirectMessage = async (commentId, messageText, accessToken) => {
  try {
    const cleanToken = accessToken ? accessToken.trim().replace(/^["']|["']$/g, '') : '';

    // 🟢 Updated to graph.instagram.com to match your token type
    const response = await axios.post(
      `https://graph.instagram.com/v23.0/me/messages`,
      {
        recipient: {
          comment_id: commentId
        },
        message: {
          text: messageText
        }
      },
      {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Instagram API DM Error:", JSON.stringify(error.response?.data || error.message, null, 2));
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message
    };
  }
};

module.exports = {
  sendDirectMessage
};