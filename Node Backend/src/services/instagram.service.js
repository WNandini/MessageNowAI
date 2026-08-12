const axios = require("axios");

const getUserPosts = async (instagramUserId, accessToken) => {
  try {
    const cleanToken = accessToken
      ? accessToken.trim().replace(/^["']|["']$/g, "")
      : "";

    const response = await axios.get(
      `https://graph.instagram.com/v23.0/${instagramUserId}/media`,
      {
        params: {
          fields:
            "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
          access_token: cleanToken,
        },
      }
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error(
      "Instagram API Posts Error:",
      JSON.stringify(
        error.response?.data || error.message,
        null,
        2
      )
    );

    return {
      success: false,
      error:
        error.response?.data?.error?.message ||
        error.message,
    };
  }
};

const sendDirectMessage = async (
  commentId,
  messageText,
  accessToken,
  attachment = null
) => {
  try {
    const cleanToken = accessToken
      ? accessToken.trim().replace(/^["']|["']$/g, "")
      : "";

    const message = {
      text: messageText,
    };

    // Add attachment only when the automation has one
    if (attachment?.url) {
      let attachmentType;

      if (attachment.type.startsWith("image/")) {
        attachmentType = "image";
      } else if (attachment.type.startsWith("video/")) {
        attachmentType = "video";
      } else if (attachment.type.startsWith("audio/")) {
        attachmentType = "audio";
      }

      if (attachmentType) {
        message.attachment = {
          type: attachmentType,
          payload: {
            url: attachment.url,
          },
        };
      }
    }

    const response = await axios.post(
      "https://graph.instagram.com/v23.0/me/messages",
      {
        recipient: {
          comment_id: commentId,
        },
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Instagram API DM Error:",
      JSON.stringify(
        error.response?.data || error.message,
        null,
        2
      )
    );

    return {
      success: false,
      error:
        error.response?.data?.error?.message ||
        error.message,
    };
  }
};


module.exports = {
  sendDirectMessage,
};

module.exports = {
  getUserPosts,
  sendDirectMessage
};