import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route imports
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import adminRoutes from './routes/admin.js';
import profileRoutes from './routes/profile.js';
import registrationRoutes from './routes/registrations.js';

const app = express();

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enable CORS with proper configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Disposition'],
    })
);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'PES EventHub API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            events: '/api/events',
            admin: '/api/admin',
        },
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
