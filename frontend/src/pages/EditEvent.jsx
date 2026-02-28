import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        department: '',
        clubName: '',
        date: '',
        time: '',
        venue: '',
        registrationDeadline: '',
        whatsappGroupLink: '',
        rules: '',
        paymentRequired: false,
        paymentAmount: '',
        paymentQRCode: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const response = await api.get(`/api/events/${id}`);
            const event = response.data.data;

            // Format dates for input fields
            const eventDate = new Date(event.date).toISOString().split('T')[0];
            const deadline = new Date(event.registrationDeadline).toISOString().split('T')[0];

            setFormData({
                title: event.title,
                description: event.description,
                department: event.department || '',
                clubName: event.clubName || '',
                date: eventDate,
                time: event.time,
                venue: event.venue,
                registrationDeadline: deadline,
                whatsappGroupLink: event.whatsappGroupLink || '',
                rules: event.rules || '',
                paymentRequired: event.paymentRequired || false,
                paymentAmount: event.paymentAmount || '',
                paymentQRCode: event.paymentQRCode || '',
            });
        } catch (err) {
            setError('Failed to load event');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleQRUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, paymentQRCode: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            await api.put(`/api/admin/events/${id}`, formData);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update event');
        } finally {
            setSaving(false);
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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="card-header">
                        <h1 className="text-3xl font-bold">Edit Event</h1>
                    </div>

                    <div className="card-body">
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Title *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                        Department (Optional)
                                    </label>
                                    <input
                                        id="department"
                                        name="department"
                                        type="text"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Dept of CSE"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Club Name (Optional)
                                    </label>
                                    <input
                                        id="clubName"
                                        name="clubName"
                                        type="text"
                                        value={formData.clubName}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Tech Club"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Event Date *
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        min="2026-01-01"
                                        max="2050-12-31"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                                        Event Time *
                                    </label>
                                    <input
                                        id="time"
                                        name="time"
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
                                    Venue *
                                </label>
                                <input
                                    id="venue"
                                    name="venue"
                                    type="text"
                                    required
                                    value={formData.venue}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                                    Registration Deadline *
                                </label>
                                <input
                                    id="registrationDeadline"
                                    name="registrationDeadline"
                                    type="date"
                                    required
                                    min="2026-01-01"
                                    max="2050-12-31"
                                    value={formData.registrationDeadline}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="whatsappGroupLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    WhatsApp Group Link (Optional)
                                </label>
                                <input
                                    id="whatsappGroupLink"
                                    name="whatsappGroupLink"
                                    type="url"
                                    value={formData.whatsappGroupLink}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="https://chat.whatsapp.com/..."
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Registered users will see this link after registration
                                </p>
                            </div>

                            <div>
                                <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Rules/Guidelines (Optional)
                                </label>
                                <textarea
                                    id="rules"
                                    name="rules"
                                    rows="4"
                                    value={formData.rules}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Enter event rules, eligibility criteria, or important guidelines..."
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    These rules will be shown to users before registration
                                </p>
                            </div>

                            {/* Payment Section */}
                            <div className="border-t pt-6">
                                <div className="flex items-center mb-4">
                                    <input
                                        id="paymentRequired"
                                        name="paymentRequired"
                                        type="checkbox"
                                        checked={formData.paymentRequired}
                                        onChange={(e) => setFormData({ ...formData, paymentRequired: e.target.checked })}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="paymentRequired" className="ml-2 block text-sm font-medium text-gray-700">
                                        This event requires payment
                                    </label>
                                </div>

                                {formData.paymentRequired && (
                                    <div className="space-y-4 pl-6 border-l-2 border-primary-200">
                                        <div>
                                            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                                Payment Amount (₹) *
                                            </label>
                                            <input
                                                id="paymentAmount"
                                                name="paymentAmount"
                                                type="number"
                                                min="0"
                                                required={formData.paymentRequired}
                                                value={formData.paymentAmount}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="100"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="paymentQR" className="block text-sm font-medium text-gray-700 mb-1">
                                                Update Payment QR Code
                                            </label>
                                            <input
                                                id="paymentQR"
                                                name="paymentQR"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleQRUpload}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                            />
                                            <p className="mt-1 text-sm text-gray-500">
                                                Upload new QR code to replace the existing one
                                            </p>
                                            {formData.paymentQRCode && (
                                                <div className="mt-2">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">Current/New QR Code:</p>
                                                    <img
                                                        src={formData.paymentQRCode}
                                                        alt="Payment QR Code Preview"
                                                        className="w-32 h-32 object-contain border rounded"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/dashboard')}
                                    className="flex-1 btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;
