const mongoose = require("mongoose");

const automationSchema = new mongoose.Schema({
  instagramUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstagramUser",
    required: true,
  },
  instagramPostId: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  attachment: {
    url: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: Number,
    },
  },

  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  commentsReceived: {
    type: Number,
    default: 0
  },
  dmsSent: {
    type: Number,
    default: 0
  }
});

automationSchema.index(
  {
    instagramUserId: 1,
    instagramPostId: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.models.Automation ||
  mongoose.model("Automation", automationSchema);