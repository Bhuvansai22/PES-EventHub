import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('ongoing');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/api/admin/dashboard/stats');
            setStats(response.data.stats);
            setEvents(response.data.recentEvents);

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (activeTab === 'ongoing') {
                setFilteredEvents(response.data.recentEvents.filter(e => new Date(e.date) >= today));
            } else {
                setFilteredEvents(response.data.recentEvents.filter(e => new Date(e.date) < today));
            }
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) {
            return;
        }

        setDeleteLoading(eventId);
        try {
            await api.delete(`/api/admin/events/${eventId}`);
            fetchDashboardData(); // Refresh data
        } catch (err) {
            if (err.response?.status === 403) {
                alert('You are not authorized to delete this event. Only the event creator can delete it.');
            } else {
                alert('Failed to delete event');
            }
        } finally {
            setDeleteLoading(null);
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

    const handleDownloadReport = async () => {
        try {
            const response = await api.get('/api/admin/reports/completed-events', {
                responseType: 'blob', // Important for downloading files
            });

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: 'text/csv' });

            // Create a link element and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'completed_events_report.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            alert('Failed to download report. Ensure there are completed events available.');
            console.error(err);
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
                        <p className="text-xl text-primary-100">Manage events and view statistics</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{stats?.totalEvents || 0}</h3>
                            <p className="text-gray-600 font-medium">Total Events</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{stats?.upcomingEvents || 0}</h3>
                            <p className="text-gray-600 font-medium">Upcoming Events</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{stats?.totalRegistrations || 0}</h3>
                            <p className="text-gray-600 font-medium">Total Registrations</p>
                        </div>
                    </div>
                </div>

                {/* Create Event Button */}
                <div className="mb-8">
                    <Link to="/admin/events/create" className="btn-primary">
                        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Event
                    </Link>
                </div>

                {/* Events Table Section */}
                <div className="card">
                    <div className="card-header flex justify-between items-center sm:flex-row flex-col gap-4">
                        <h2 className="text-2xl font-bold">Events List</h2>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => handleTabChange('ongoing')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'ongoing'
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Ongoing
                            </button>
                            <button
                                onClick={() => handleTabChange('completed')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'completed'
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Event Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Venue
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registrations
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEvents.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                            No events found in this category
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEvents.map((event) => (
                                        <tr key={event._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {new Date(event.date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{event.venue}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="badge badge-info">
                                                    {event.registrationCount || 0} students
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <Link
                                                    to={`/admin/events/${event._id}/registrations`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/admin/events/${event._id}/edit`}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Edit
                                                </Link>
                                                {new Date(event.date) < new Date() ? (
                                                    <span className="text-gray-400 cursor-not-allowed" title="Cannot delete completed events">
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDelete(event._id)}
                                                        disabled={deleteLoading === event._id}
                                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                    >
                                                        {deleteLoading === event._id ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
