import express from 'express';
import {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventRegistrations,
    downloadRegistrationsCSV,
    getDashboardStats,
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/roleCheck.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Event management
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Registration management
router.get('/events/:id/registrations', getEventRegistrations);
router.get('/events/:id/registrations/csv', downloadRegistrationsCSV);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

export default router;
