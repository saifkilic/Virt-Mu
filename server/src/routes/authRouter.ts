import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authLimiter } from '../middlewares/rateLimiter';

const router = Router();

// Apply strict rate limiter to auth routes
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

export default router;