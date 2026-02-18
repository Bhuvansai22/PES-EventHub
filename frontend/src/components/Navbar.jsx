import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">PE</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                            PES EventHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link
                                    to="/events"
                                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                >
                                    Events
                                </Link>
                                {user.role !== 'admin' && (
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                    >
                                        Profile
                                    </Link>
                                )}
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-6 py-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-3">
                        {user ? (
                            <>
                                <Link
                                    to="/events"
                                    className="block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Events
                                </Link>
                                {user.role !== 'admin' && (
                                    <Link
                                        to="/profile"
                                        className="block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                )}
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block text-primary-600 font-semibold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
