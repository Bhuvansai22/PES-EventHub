import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const makeAdmin = async (email) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log('❌ User not found with email:', email);
            process.exit(1);
        }

        // Check if already admin
        if (user.role === 'admin') {
            console.log('ℹ️  User is already an admin:', user.name);
            process.exit(0);
        }

        // Update user role to admin
        user.role = 'admin';
        await user.save();

        console.log('✅ Successfully made admin:');
        console.log('   Name:', user.name);
        console.log('   Email:', user.email);
        console.log('   USN:', user.usn);
        console.log('\n⚠️  User must logout and login again to access admin features.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
    console.log('❌ Please provide an email address');
    console.log('Usage: node makeAdmin.js user@pes.edu');
    process.exit(1);
}

makeAdmin(email);
