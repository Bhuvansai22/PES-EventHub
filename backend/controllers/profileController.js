import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const { name, usn, phone, semester } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Validate USN if provided
        if (usn !== undefined) {
            const trimmedUsn = usn.trim().toUpperCase();

            // Check length
            if (trimmedUsn.length !== 10) {
                return res.status(400).json({
                    success: false,
                    message: 'USN must be exactly 10 characters',
                });
            }

            // Check if USN is being changed and if new USN already exists
            if (trimmedUsn !== user.usn) {
                const existingUser = await User.findOne({ usn: trimmedUsn });
                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: 'This USN is already registered',
                    });
                }
                user.usn = trimmedUsn;
            }
        }

        // Validate phone if provided
        if (phone !== undefined) {
            const trimmedPhone = phone.trim();
            if (trimmedPhone && !/^[0-9]{10}$/.test(trimmedPhone)) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number must be exactly 10 digits',
                });
            }
            user.phone = trimmedPhone;
        }

        // Update other fields
        if (name !== undefined) user.name = name.trim();
        if (semester !== undefined) user.semester = semester;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                name: user.name,
                usn: user.usn,
                email: user.email,
                phone: user.phone,
                semester: user.semester,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
