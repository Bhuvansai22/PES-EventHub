import express from 'express';
import { getMyRegisteredEvents } from '../controllers/eventController.js';
import { checkRegistration } from '../controllers/registrationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's registered events
router.get('/', protect, getMyRegisteredEvents);

// Check if user is registered for specific event
router.get('/check/:eventId', protect, async (req, res) => {
    req.params.id = req.params.eventId;
    return checkRegistration(req, res);
});

export default router;
