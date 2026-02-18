import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import { generateCSV } from '../utils/csvExport.js';

// @desc    Create new event
// @route   POST /api/admin/events
// @access  Private (Admin)
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, time, venue, registrationDeadline, whatsappGroupLink, rules, paymentRequired, paymentAmount, paymentQRCode } =
            req.body;

        const event = await Event.create({
            title,
            description,
            date,
            time,
            venue,
            registrationDeadline,
            whatsappGroupLink,
            rules,
            paymentRequired: paymentRequired || false,
            paymentAmount: paymentRequired ? paymentAmount : undefined,
            paymentQRCode: paymentRequired ? paymentQRCode : undefined,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update event
// @route   PUT /api/admin/events/:id
// @access  Private (Admin)
export const updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        // Check if the requesting admin is the creator of the event
        if (!event.createdBy || event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Only the event creator can edit this event',
            });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete event
// @route   DELETE /api/admin/events/:id
// @access  Private (Admin - Creator Only)
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        // Check if the requesting admin is the creator of the event
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Only the event creator can delete this event',
            });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all registrations for an event
// @route   GET /api/admin/events/:id/registrations
// @access  Private (Admin)
export const getEventRegistrations = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        // Check if the logged-in admin is the creator of this event
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view registrations for this event',
            });
        }

        const registrations = await Registration.find({ event: req.params.id })
            .sort({ registeredAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Download event registrations as CSV
// @route   GET /api/admin/events/:id/registrations/csv
// @access  Private (Admin)
export const downloadRegistrationsCSV = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        // Check if the logged-in admin is the creator of this event
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to download registrations for this event',
            });
        }

        const registrations = await Registration.find({ event: req.params.id });

        // Prepare data for CSV with new fields
        const data = registrations.map((reg) => ({
            Name: reg.studentName,
            USN: reg.usn,
            Email: reg.email,
            Phone: reg.phone,
            Semester: reg.semester,
            'Transaction ID': reg.transactionId || 'N/A',
            'Registered At': new Date(reg.registeredAt).toLocaleString(),
        }));

        const fields = ['Name', 'USN', 'Email', 'Phone', 'Semester', 'Transaction ID', 'Registered At'];
        const csv = generateCSV(data, fields);

        // Set headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${event.title.replace(/\s+/g, '_')}_registrations.csv"`
        );

        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        const upcomingEvents = await Event.countDocuments({
            date: { $gte: new Date() },
        });

        // Get total registrations across all events
        const totalRegistrations = await Registration.countDocuments();

        // Get recent events
        const recentEvents = await Event.find()
            .populate('createdBy', 'name email')
            .populate('registrationCount')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalEvents,
                upcomingEvents,
                totalRegistrations,
            },
            recentEvents,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
