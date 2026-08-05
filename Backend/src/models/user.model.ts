// src/models/user.model.ts
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>(
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
      select: false, // Hide from queries by default
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
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Remove __v and _id when sending response
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.accessToken; // Never send accessToken
    return ret;
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;