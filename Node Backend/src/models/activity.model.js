const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  automationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Automation",
    default: null
  },
  instagramUserId: {
    type: String,
    required: true
  },
  commentId: {
    type: String,
    required: true
  },
  commentText: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    default: null
  },
  messageSent: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED"],
    required: true
  },
  error: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Activity", activitySchema);