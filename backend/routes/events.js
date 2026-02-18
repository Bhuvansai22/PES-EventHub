import express from 'express';
import {
    getAllEvents,
    getEvent,
    registerForEvent,
    getMyRegisteredEvents,
} from '../controllers/eventController.js';
import { checkRegistration } from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - MUST come before parameterized routes
router.get('/my/registrations', protect, getMyRegisteredEvents);

// Public routes - no authentication required
router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/:id/register', registerForEvent);

// Protected parameterized routes
router.get('/:id/check-registration', protect, checkRegistration);

export default router;
