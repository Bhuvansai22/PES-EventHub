import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import EventCard from '../components/EventCard';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        try {
            console.log('Fetching my events...');
            const response = await api.get('/api/registrations');
            console.log('Response:', response.data);
            setEvents(response.data.events);
        } catch (err) {
            console.error('Error fetching my events:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            setError('Failed to load your registered events');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-4">My Registered Events</h1>
                    <p className="text-xl text-primary-100">
                        View all events you've registered for
                    </p>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {events.length === 0 ? (
                    <div className="text-center py-16">
                        <svg
                            className="mx-auto h-24 w-24 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        <h3 className="mt-4 text-2xl font-semibold text-gray-900">No registered events</h3>
                        <p className="mt-2 text-gray-600">You haven't registered for any events yet.</p>
                        <Link to="/" className="mt-6 inline-block btn-primary">
                            Browse Events
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEvents;
