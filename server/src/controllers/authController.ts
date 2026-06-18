import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sendResponse as sendSuccess , sendError } from '../utils/response';

// Helper to generate a JWT token
const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET || 'defaultsecret';
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

// @desc Register a new user (email, username, password)
// @route POST /api/auth/register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return sendError(res, 'Email, username and password are required', 400);
  }
  // Check for existing user
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return sendError(res, 'User with given email or username already exists', 409);
  }
  const user = await User.create({ email, username, password, emailVerified: false, loginAttempts: 0, preferences: { notifications: true, newsletter: false }, stats: { artifactsViewed: 0, totalTimeSpent: 0, commentsCount: 0, favoritesCount: 0, museumsVisited: [] }, favorites: [], badges: [], role: 'user' });
  const token = generateToken(user.id);
  return sendSuccess(res, { token, user: { id: user.id, email: user.email, username: user.username } }, 'User registered');
});

// @desc Login an existing user
// @route POST /api/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, 'Email and password are required', 400);
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return sendError(res, 'Invalid credentials', 401);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return sendError(res, 'Invalid credentials', 401);
  }
  const token = generateToken(user.id);
  return sendSuccess(res, { token, user: { id: user.id, email: user.email, username: user.username } }, 'Login successful');
});
