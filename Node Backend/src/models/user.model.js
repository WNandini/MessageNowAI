// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    instagramId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
      select: false,
    },
    trialEndsAt: {
      type: Date,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscriptionEndsAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.accessToken;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);