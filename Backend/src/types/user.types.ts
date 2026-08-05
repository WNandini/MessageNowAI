// src/types/user.types.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  instagramId: string;
  username: string;
  accessToken: string;
  trialEndsAt: Date;
  isSubscribed: boolean;
  subscriptionEndsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}