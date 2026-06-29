import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAchievement extends Document {
  id: string;
  name: string;
  description: string;
  type: 'saves' | 'comments';
  threshold: number; // Trigger point (e.g., 5 saves, 10 comments)
  earnedAt: Date;
}

export interface IRefreshToken extends Document {
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}

export interface IUser extends Document {
  email: string;
  username: string;
  password?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
  language: 'en' | 'ur';
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
  };
  stats: {
    artifactsViewed: number;
    totalTimeSpent: number; // in seconds
    commentsCount: number;
    favoritesCount: number;
    museumsVisited: Array<{
      museumId: mongoose.Types.ObjectId;
      visitCount: number;
      totalTime: number; // in seconds
      lastVisit: Date;
    }>;
  };
  favorites: mongoose.Types.ObjectId[];
  
  // NEW: Lifetime achievements (persistent, never removed even if items are unfavorited)
  achievements: IAchievement[];

  // NEW: Refresh tokens for secure JWT refresh mechanism
  // Stores active refresh tokens with expiration dates
  // Enables multi-device support and proper logout
  refreshTokens: IRefreshToken[];
  
  role: 'user' | 'curator' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const achievementSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['saves', 'comments'], required: true },
  threshold: { type: Number, required: true },
  earnedAt: { type: Date, default: Date.now },
});

// NEW: Schema for refresh tokens
// Each token is paired with its expiration date
// Tokens are created on login/register and refresh
// Cleared on logout or when expired
const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Ensure each token is unique
    sparse: true, // Allow null values
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true, // Index for efficient expiration queries
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false }); // Don't create separate ObjectId for refresh tokens

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // Do not return password by default in queries
  },
  displayName: String,
  avatar: String,
  bio: String,
  language: {
    type: String,
    enum: ['en', 'ur'],
    default: 'en',
  },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  preferences: {
    notifications: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false },
  },
  stats: {
    artifactsViewed: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 }, // in seconds
    commentsCount: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    museumsVisited: [
      {
        museumId: { type: Schema.Types.ObjectId, ref: 'Museum' },
        visitCount: { type: Number, default: 0 },
        totalTime: { type: Number, default: 0 }, // in seconds
        lastVisit: Date,
      },
    ],
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Artifact',
  }],
  
  // Achievements array - persistent lifetime tracking
  achievements: [achievementSchema],

  // NEW: Refresh tokens array
  // Stores multiple active tokens (up to 5) for multi-device support
  // Each token has expiration date for automatic cleanup
  refreshTokens: [refreshTokenSchema],
  
  role: {
    type: String,
    enum: ['user', 'curator', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

// Pre-save hook to hash user passwords
userSchema.pre('save', async function () {
  const user = this as any;
  if (!user.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password || '', salt);
});

// Compare password helper method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  // Since password has select: false, we need to ensure the password field is loaded
  if (!this.password) {
    throw new Error('Password field not populated in document');
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Index for efficient token lookups
userSchema.index({ 'refreshTokens.token': 1 });
userSchema.index({ 'refreshTokens.expiresAt': 1 });

// Compound index for refresh token validation (token + expiration)
userSchema.index({ 'refreshTokens.token': 1, 'refreshTokens.expiresAt': 1 });

// General indexes
userSchema.index({ createdAt: -1 });

export const User = mongoose.model<IUser>('User', userSchema);