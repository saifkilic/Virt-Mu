import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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
    totalTimeSpent: number;
    commentsCount: number;
    favoritesCount: number;
    museumsVisited: Array<{
      museumId: mongoose.Types.ObjectId;
      visitCount: number;
      totalTime: number;
      lastVisit: Date;
    }>;
  };
  favorites: mongoose.Types.ObjectId[];
  badges: Array<{
    name: string;
    description: string;
    earnedAt: Date;
  }>;
  role: 'user' | 'curator' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

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
    totalTimeSpent: { type: Number, default: 0 },
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
  badges: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      earnedAt: { type: Date, default: Date.now },
    },
  ],
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

userSchema.index({ createdAt: -1 });

export const User = mongoose.model<IUser>('User', userSchema);
