import cron from 'node-cron';
import Event from '../models/Event.js';

const startCronJobs = () => {
    // Run every hour to check for expired events
    // Cron schedule: 0 * * * * (At minute 0 past every hour)
    cron.schedule('0 * * * *', async () => {
        console.log('Running cron job: Checking for expired events...');
        try {
            const now = new Date();

            // Find events where registration deadline has passed
            const result = await Event.deleteMany({
                registrationDeadline: { $lt: now }
            });

            if (result.deletedCount > 0) {
                console.log(`✅ Cleanup: Removed ${result.deletedCount} expired events.`);
            } else {
                console.log('ℹ️  Cleanup: No expired events found.');
            }
        } catch (error) {
            console.error('❌ Error in cron job:', error);
        }
    });

    console.log('🕐 Cron jobs initialized: Event cleanup scheduled to run every hour.');
};

export default startCronJobs;
