import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        phone: '',
        semester: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/api/profile');
            setUser(response.data.data);
            setFormData({
                name: response.data.data.name || '',
                usn: response.data.data.usn || '',
                phone: response.data.data.phone || '',
                semester: response.data.data.semester || '',
            });
            setLoading(false);
        } catch (err) {
            setError('Failed to load profile');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const response = await api.put('/api/profile', formData);
            setUser(response.data.data);
            setSuccess('Profile updated successfully!');

            // Redirect back to event page if came from there
            setTimeout(() => {
                if (location.state?.from) {
                    navigate(location.state.from);
                } else {
                    navigate('/events');
                }
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
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
                <div className="card animate-fadeIn">
                    <div className="card-header">
                        <h1 className="text-3xl font-bold">My Profile</h1>
                        <p className="text-primary-100 mt-2">
                            Manage your personal information
                        </p>
                    </div>

                    <div className="card-body">
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Read-only field - Email */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Account Email (Read-only)
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="input-field bg-gray-100 cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Email cannot be changed
                                    </p>
                                </div>
                            </div>

                            {/* Editable fields */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Personal Information
                                </h3>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-1">
                                        USN <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="usn"
                                        name="usn"
                                        type="text"
                                        value={formData.usn}
                                        onChange={handleChange}
                                        required
                                        className="input-field uppercase"
                                        placeholder="1PE20CS001"
                                        minLength={10}
                                        maxLength={10}
                                        pattern=".{10}"
                                        title="USN must be exactly 10 characters"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Must be exactly 10 characters (e.g., 1PE20CS001)
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="9876543210"
                                        pattern="[0-9]{10}"
                                        title="Please enter a valid 10-digit phone number"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter 10-digit phone number without country code
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Semester
                                    </label>
                                    <select
                                        id="semester"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        className="input-field"
                                    >
                                        <option value="">Select Semester</option>
                                        <option value="1">1st Semester</option>
                                        <option value="2">2nd Semester</option>
                                        <option value="3">3rd Semester</option>
                                        <option value="4">4th Semester</option>
                                        <option value="5">5th Semester</option>
                                        <option value="6">6th Semester</option>
                                        <option value="7">7th Semester</option>
                                        <option value="8">8th Semester</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? 'Saving...' : 'Save Profile'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/events')}
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

export default Profile;
