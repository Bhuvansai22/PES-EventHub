import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

export default router;
