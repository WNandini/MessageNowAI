// const mongoose = require('mongoose');

// // Define the database schema for the Instagram User
// const instagramUserSchema = new mongoose.Schema({
//   instagramId: { type: String, required: true, unique: true },
//   username: { type: String, required: true },
//   accessToken: { type: String, required: true },
// });

// // Export model as InstagramUser
// module.exports = mongoose.model('InstagramUser', instagramUserSchema);

const mongoose = require('mongoose');

const instagramUserSchema = new mongoose.Schema({
  instagramId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: String,
  accessToken: { type: String, required: true },
  profilePicture: String,
  biography: String,
  accountType: String,
  followersCount: Number,
  mediaCount: Number,
  pageId: String,
  pageName: String,
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InstagramUser', instagramUserSchema);