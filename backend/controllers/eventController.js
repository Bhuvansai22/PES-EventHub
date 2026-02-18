import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('createdBy', 'name')
            .populate('registrationCount')
            .sort({ date: -1 }); // Show newest first

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Get single event details
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'name')
            .populate('registrationCount');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Public
export const registerForEvent = async (req, res) => {
    try {
        const { studentName, usn, email, phone, semester, transactionId } = req.body;

        // Check if event exists
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        // Check if registration deadline has passed
        if (new Date() > new Date(event.registrationDeadline)) {
            return res.status(400).json({
                success: false,
                message: 'Registration deadline has passed',
            });
        }

        // Check if payment is required and transaction ID is provided
        if (event.paymentRequired && !transactionId) {
            return res.status(400).json({
                success: false,
                message: 'Transaction ID is required for this paid event',
            });
        }

        // Check if user is already registered for this event
        const existingRegistration = await Registration.findOne({
            event: req.params.id,
            usn: usn.toUpperCase(),
        });

        if (existingRegistration) {
            return res.status(400).json({
                success: false,
                message: 'You are already registered for this event',
            });
        }

        // Create registration
        const registration = await Registration.create({
            event: req.params.id,
            studentName,
            usn: usn.toUpperCase(),
            email: email.toLowerCase(),
            phone,
            semester,
            transactionId: transactionId ? transactionId.toUpperCase() : undefined,
        });

        res.status(201).json({
            success: true,
            message: 'Successfully registered for the event',
            data: registration,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Get events user has registered for
// @route   GET /api/events/my/registrations
// @access  Private
export const getMyRegisteredEvents = async (req, res) => {
    try {
        console.log('Getting registered events for user:', req.user.usn);

        // Find all registrations for this user (normalize USN to uppercase)
        const registrations = await Registration.find({
            usn: req.user.usn.toUpperCase()
        }).select('event');

        console.log('Found registrations:', registrations.length);

        // Get event IDs
        const eventIds = registrations.map(reg => reg.event);

        // Fetch all events user is registered for
        const events = await Event.find({ _id: { $in: eventIds } })
            .populate('createdBy', 'name')
            .populate('registrationCount')
            .sort({ date: 1 }); // Upcoming events first

        console.log('Found events:', events.length);

        res.status(200).json({
            success: true,
            count: events.length,
            events: events,
        });
    } catch (error) {
        console.error('Error in getMyRegisteredEvents:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
