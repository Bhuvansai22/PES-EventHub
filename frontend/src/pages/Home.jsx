import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                                The Hub for
                                <span className="block text-primary-600">Campus Events</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                Discover, register, and participate in exciting events at PES University.
                                Stay connected with your campus community and never miss an opportunity.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {user ? (
                                <Link
                                    to="/events"
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Browse Events
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            ) : (
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="relative">
                        <div className="relative z-10">
                            {/* Main illustration container */}
                            <div className="bg-gradient-to-br from-primary-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                                <div className="space-y-6">
                                    {/* Floating cards */}
                                    <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Tech Workshop</div>
                                                <div className="text-sm text-gray-500">Technical Events</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-200 ml-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Cultural Fest</div>
                                                <div className="text-sm text-gray-500">Cultural Events</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Hackathon</div>
                                                <div className="text-sm text-gray-500">Coding Competitions</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PES EventHub?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Your one-stop platform for all campus events and activities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-shadow duration-200">
                            <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Discover Events</h3>
                            <p className="text-gray-600">
                                Explore a diverse range of events - from technical workshops and hackathons to cultural festivals and sports competitions. Find what interests you most.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-shadow duration-200">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Registration</h3>
                            <p className="text-gray-600">
                                Register for events in seconds with our streamlined process. Get instant confirmation and all event details delivered to you immediately.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-shadow duration-200">
                            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Stay Connected</h3>
                            <p className="text-gray-600">
                                Join event WhatsApp groups instantly after registration. Connect with participants and organizers easily.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Getting started is simple and takes just a few minutes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    1
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Create Account</h3>
                                <p className="text-gray-600 text-sm">
                                    Sign up with your PES email and complete your profile in minutes
                                </p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    2
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Browse Events</h3>
                                <p className="text-gray-600 text-sm">
                                    Explore upcoming events across technical, cultural, and sports categories
                                </p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    3
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Register</h3>
                                <p className="text-gray-600 text-sm">
                                    Click register and get instant confirmation with all event details
                                </p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                4
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Participate</h3>
                            <p className="text-gray-600 text-sm">
                                Join the WhatsApp group, attend the event, and make the most of it
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Students, By Students</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Designed to enhance your campus experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Centralized Platform</h4>
                                <p className="text-gray-600 text-sm">All campus events in one place - easy to discover and register</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Quick & Simple</h4>
                                <p className="text-gray-600 text-sm">Fast registration process with instant confirmation</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">WhatsApp Integration</h4>
                                <p className="text-gray-600 text-sm">Join event WhatsApp groups directly after registration</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Connect with Peers</h4>
                                <p className="text-gray-600 text-sm">Meet and network with fellow students at events</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {!user && (
                <div className="bg-gradient-to-r from-primary-600 to-purple-600 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Join thousands of students already using PES EventHub
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Create Your Account
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
