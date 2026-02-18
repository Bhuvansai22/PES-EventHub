import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EventRegistrations = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            // Fetch event details
            const eventResponse = await api.get(`/api/events/${id}`);
            setEvent(eventResponse.data.data);

            // Fetch registrations
            const regResponse = await api.get(`/api/admin/events/${id}/registrations`);
            setRegistrations(regResponse.data.data);
        } catch (err) {
            if (err.response?.status === 403) {
                setError('You are not authorized to view registrations for this event. Only the event creator can access this.');
                setTimeout(() => navigate('/admin/dashboard'), 3000);
            } else {
                setError('Failed to load registrations');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = async () => {
        setDownloading(true);
        try {
            const response = await api.get(`/api/admin/events/${id}/registrations/csv`, {
                responseType: 'blob',
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}_registrations.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            if (err.response?.status === 403) {
                alert('You are not authorized to download registrations for this event. Only the event creator can download.');
            } else {
                alert('Failed to download CSV');
            }
        } finally {
            setDownloading(false);
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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </button>

                <div className="card animate-fadeIn">
                    <div className="card-header flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">{event?.title}</h1>
                            <p className="mt-2 text-primary-100">
                                Total Registrations: {registrations.length}
                            </p>
                        </div>
                        <button
                            onClick={handleDownloadCSV}
                            disabled={downloading || registrations.length === 0}
                            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {downloading ? 'Downloading...' : 'Download CSV'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {error && (
                            <div className="m-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {registrations.length === 0 ? (
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
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-2xl font-semibold text-gray-900">No registrations yet</h3>
                                <p className="mt-2 text-gray-600">Students will appear here once they register</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            USN
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Semester
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registrations.map((reg, index) => (
                                        <tr key={reg._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{reg.studentName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600 uppercase">{reg.usn}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{reg.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{reg.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{reg.semester}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventRegistrations;
