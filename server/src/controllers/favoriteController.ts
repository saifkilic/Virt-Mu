// src/controllers/favoriteController.ts
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { User } from '../models/User';
import { Artifact } from '../models/Artifact';
import { sendResponse as sendSuccess, sendError } from '../utils/response';

/**
 * @desc Toggle favorite status for an artifact for the authenticated user
 * @route POST /api/favorites/:artifactId
 */
export const toggleFavorite = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { artifactId } = req.params;

  if (!userId) {
    return sendError(res, 'User not authenticated', 401);
  }

  // Verify artifact exists
  const artifact = await Artifact.findById(artifactId);
  if (!artifact) {
    return sendError(res, 'Artifact not found', 404);
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  const favIndex = user.favorites.findIndex((fav) => fav.toString() === artifactId);
  let isFavorited: boolean;
  if (favIndex > -1) {
    // Already favorited – remove it
    user.favorites.splice(favIndex, 1);
    isFavorited = false;
  } else {
    // Not favorited – add it
    user.favorites.push(artifact._id);
    isFavorited = true;
  }

  await user.save();

  sendSuccess(res, { artifactId, isFavorited }, 'Favorite status updated');
});
