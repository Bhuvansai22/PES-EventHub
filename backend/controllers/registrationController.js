import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// @desc    Check if user is registered for an event
// @route   GET /api/events/:id/check-registration
// @access  Private
export const checkRegistration = async (req, res) => {
    try {
        const registration = await Registration.findOne({
            event: req.params.id,
            usn: req.user.usn,
        });

        res.status(200).json({
            success: true,
            isRegistered: !!registration,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

export default { checkRegistration };
