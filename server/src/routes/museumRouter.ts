import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createMuseum, getMuseums, getMuseum, updateMuseum, deleteMuseum } from '../controllers/museumController';

const router = Router();

// Public read routes
router.get('/', getMuseums);
router.get('/:id', getMuseum);

// Protected write routes
router.post('/', protect, createMuseum);
router.put('/:id', protect, updateMuseum);
router.delete('/:id', protect, deleteMuseum);

export default router;
