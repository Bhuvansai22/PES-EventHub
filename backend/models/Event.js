import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide event title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide event description'],
        },
        department: {
            type: String,
            trim: true,
        },
        clubName: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            required: [true, 'Please provide event date'],
            validate: {
                validator: function (v) {
                    const year = new Date(v).getFullYear();
                    return year >= 2026 && year <= 2050;
                },
                message: 'Event date must be between years 2026 and 2050'
            }
        },
        time: {
            type: String,
            required: [true, 'Please provide event time'],
        },
        venue: {
            type: String,
            required: [true, 'Please provide event venue'],
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        registrationDeadline: {
            type: Date,
            required: [true, 'Please provide registration deadline'],
            validate: {
                validator: function (v) {
                    const year = new Date(v).getFullYear();
                    return year >= 2026 && year <= 2050;
                },
                message: 'Registration deadline must be between years 2026 and 2050'
            }
        },
        whatsappGroupLink: {
            type: String,
            trim: true,
        },
        rules: {
            type: String,
            trim: true,
        },
        paymentRequired: {
            type: Boolean,
            default: false,
        },
        paymentAmount: {
            type: Number,
            min: [0, 'Payment amount cannot be negative'],
        },
        paymentQRCode: {
            type: String, // Base64 encoded image
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual for registration count
eventSchema.virtual('registrationCount', {
    ref: 'Registration',
    localField: '_id',
    foreignField: 'event',
    count: true,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
