import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createArtifact, getArtifacts, getArtifact, updateArtifact, deleteArtifact } from '../controllers/artifactController';

const router = Router();

router.get('/', getArtifacts);
router.get('/:id', getArtifact);
router.post('/', protect, createArtifact);
router.put('/:id', protect, updateArtifact);
router.delete('/:id', protect, deleteArtifact);

export default router;
