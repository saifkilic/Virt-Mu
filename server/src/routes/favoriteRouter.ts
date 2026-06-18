// src/routes/favoriteRouter.ts
import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { toggleFavorite } from '../controllers/favoriteController';

const router = Router();

// Toggle favorite for an artifact (POST /api/favorites/:artifactId)
router.post('/:artifactId', protect, toggleFavorite);

export default router;
