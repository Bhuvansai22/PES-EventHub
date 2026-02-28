import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import EventCard from '../components/EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('ongoing');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/api/events');
            const allEvents = response.data.data;
            setEvents(allEvents);

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (activeTab === 'ongoing') {
                setFilteredEvents(allEvents.filter(e => new Date(e.date) >= today));
            } else {
                setFilteredEvents(allEvents.filter(e => new Date(e.date) < today));
            }

            setLoading(false);
        } catch (err) {
            setError('Failed to load events');
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (tab === 'ongoing') {
            setFilteredEvents(events.filter(e => new Date(e.date) >= today));
        } else {
            setFilteredEvents(events.filter(e => new Date(e.date) < today));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Events
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Discover and register for exciting events at PES College
                    </p>
                    <div className="flex justify-center">
                        <div className="flex bg-gray-100 rounded-lg p-1 max-w-sm w-full mx-auto">
                            <button
                                onClick={() => handleTabChange('ongoing')}
                                className={`flex-1 px-6 py-3 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === 'ongoing'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                Ongoing
                            </button>
                            <button
                                onClick={() => handleTabChange('completed')}
                                className={`flex-1 px-6 py-3 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === 'completed'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                )}

                {!loading && !error && filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <svg
                            className="mx-auto h-24 w-24 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No Events Found
                        </h3>
                        <p className="text-gray-500">
                            There are currently no events in this category.
                        </p>
                    </div>
                )}

                {!loading && !error && filteredEvents.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <Link key={event._id} to={`/events/${event._id}`}>
                                <EventCard event={event} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
