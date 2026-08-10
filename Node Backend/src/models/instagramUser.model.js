const mongoose = require("mongoose");

const instagramUserSchema = new mongoose.Schema({
  instagramId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String
  },
  accessToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = 
  mongoose.models.InstagramUser || mongoose.model("InstagramUser", instagramUserSchema);