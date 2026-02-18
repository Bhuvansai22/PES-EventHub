import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        studentName: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        usn: {
            type: String,
            required: [true, 'Please provide your USN'],
            uppercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        phone: {
            type: String,
            required: [true, 'Please provide your phone number'],
            trim: true,
            match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
        },
        semester: {
            type: String,
            required: [true, 'Please provide your semester'],
            trim: true,
        },
        transactionId: {
            type: String,
            trim: true,
            uppercase: true,
        },
        registeredAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Index to prevent duplicate registrations
registrationSchema.index({ event: 1, email: 1 }, { unique: true });
registrationSchema.index({ event: 1, usn: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema);
