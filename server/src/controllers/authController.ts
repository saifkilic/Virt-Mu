import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sendResponse as sendSuccess , sendError } from '../utils/response';

const generateToken = (userId: string, role: string) => {
  const secret = process.env.JWT_SECRET || 'defaultsecret';
  return jwt.sign({ id: userId, role }, secret, { expiresIn: '7d' });
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return sendError(res, 'Email, username and password are required', 400);
  }
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return sendError(res, 'User with given email or username already exists', 409);
  }
  const user = await User.create({ email, username, password, emailVerified: false, loginAttempts: 0, preferences: { notifications: true, newsletter: false }, stats: { artifactsViewed: 0, totalTimeSpent: 0, commentsCount: 0, favoritesCount: 0, museumsVisited: [] }, favorites: [], badges: [], role: 'user' });
  const token = generateToken(user.id, user.role);
  return sendSuccess(res, { token, user: { id: user.id, email: user.email, username: user.username, role: user.role } }, 'User registered');
});

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
  const token = generateToken(user.id, user.role);
  return sendSuccess(res, { token, user: { id: user.id, email: user.email, username: user.username, role: user.role } }, 'Login successful');
});