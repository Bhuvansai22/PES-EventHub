import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [event, setEvent] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    const [showQRModal, setShowQRModal] = useState(false);

    useEffect(() => {
        fetchEvent();
        fetchProfile();
        if (user && user.role !== "admin") {
            checkRegistrationStatus();
        }
    }, [id, user]);

    const fetchEvent = async () => {
        try {
            const response = await api.get(`/api/events/${id}`);
            setEvent(response.data.data);
        } catch (err) {
            setError("Failed to load event details");
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await api.get("/api/profile");
            setProfile(response.data.data);
        } catch (err) {
            console.error("Profile fetch failed:", err);
        }
    };

    const checkRegistrationStatus = async () => {
        try {
            const response = await api.get(
                `/api/events/${id}/check-registration`
            );
            setIsRegistered(response.data.isRegistered);
        } catch (err) {
            console.error("Registration check failed:", err);
        }
    };

    const isProfileComplete = () => {
        return profile && profile.phone && profile.semester;
    };

    const handleRegister = async () => {
        if (!isProfileComplete()) {
            setError(
                "Please complete your profile before registering."
            );
            return;
        }

        if (event.paymentRequired && !transactionId) {
            setError("Please enter Transaction ID.");
            return;
        }

        setError("");
        setSuccess("");
        setRegistering(true);

        try {
            await api.post(`/api/events/${id}/register`, {
                studentName: profile.name,
                usn: profile.usn,
                email: profile.email,
                phone: profile.phone,
                semester: profile.semester,
                transactionId: event.paymentRequired
                    ? transactionId
                    : undefined,
            });

            setSuccess(
                "Successfully registered! See you at the event 🎉"
            );
            setIsRegistered(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed."
            );
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-20">
                {error || "Event not found"}
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const deadline = new Date(event.registrationDeadline);
    const isDeadlinePassed = new Date() > deadline;
    const isEventPassed = new Date() > eventDate;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">

                {/* Event Info */}
                <div className="card mb-8">
                    <div className="card-header">
                        <h1 className="text-3xl font-bold">
                            {event.title}
                        </h1>
                    </div>

                    <div className="card-body space-y-4">
                        <p><strong>Date:</strong> {eventDate.toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <p><strong>Deadline:</strong> {deadline.toLocaleDateString()}</p>
                        <p>{event.description}</p>

                        {event.rules && (
                            <div>
                                <h3 className="font-semibold mt-4">
                                    Rules & Guidelines
                                </h3>
                                <p className="whitespace-pre-line">
                                    {event.rules}
                                </p>
                            </div>
                        )}

                        {event.paymentRequired && (
                            <div className="bg-yellow-50 p-4 rounded">
                                <p>
                                    💳 <strong>Amount:</strong> ₹
                                    {event.paymentAmount}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Registration Section */}
                {user?.role !== "admin" && (
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-xl font-bold">
                                Register for Event
                            </h2>
                        </div>

                        <div className="card-body space-y-6">

                            {success && (
                                <div className="bg-green-100 p-4 rounded">
                                    {success}
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-100 p-4 rounded">
                                    {error}
                                </div>
                            )}

                            {isEventPassed ? (
                                <p>This event has already occurred.</p>
                            ) : isDeadlinePassed ? (
                                <p>Registration deadline passed.</p>
                            ) : isRegistered ? (
                                <div className="bg-green-50 p-4 rounded">
                                    ✅ Already Registered
                                </div>
                            ) : (
                                <>
                                    {!isProfileComplete() && (
                                        <div className="bg-yellow-100 p-4 rounded">
                                            Complete your profile first.
                                            <Link
                                                to="/profile"
                                                className="ml-3 text-blue-600 underline"
                                            >
                                                Go to Profile
                                            </Link>
                                        </div>
                                    )}

                                    {isProfileComplete() && (
                                        <>
                                            {/* Profile Preview */}
                                            <div className="bg-blue-50 p-4 rounded">
                                                <p><strong>Name:</strong> {profile?.name}</p>
                                                <p><strong>USN:</strong> {profile?.usn}</p>
                                                <p><strong>Email:</strong> {profile?.email}</p>
                                                <p><strong>Phone:</strong> {profile?.phone}</p>
                                                <p><strong>Semester:</strong> {profile?.semester}</p>
                                            </div>

                                            {/* Payment Section */}
                                            {event.paymentRequired && (
                                                <div className="bg-yellow-50 p-6 rounded border border-yellow-200">
                                                    <h3 className="font-semibold text-yellow-900 mb-4 flex items-center">
                                                        💳 Payment Required - ₹{event.paymentAmount}
                                                    </h3>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Left Column: QR Code */}
                                                        {event.paymentQRCode && (
                                                            <div className="flex flex-col items-center">
                                                                <p className="text-sm text-yellow-800 mb-3 font-medium">
                                                                    Scan QR Code to Pay
                                                                </p>
                                                                <div
                                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                                    onClick={() => setShowQRModal(true)}
                                                                    title="Click to view full size"
                                                                >
                                                                    <img
                                                                        src={event.paymentQRCode}
                                                                        alt="Payment QR Code"
                                                                        className="w-48 h-48 object-contain border-2 border-yellow-400 rounded bg-white shadow-md"
                                                                    />
                                                                </div>
                                                                <p className="text-xs text-yellow-700 mt-2">
                                                                    Click to enlarge
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Right Column: Transaction ID Input */}
                                                        <div className="flex flex-col justify-center">
                                                            <label
                                                                htmlFor="transactionId"
                                                                className="block text-sm font-semibold text-yellow-900 mb-2"
                                                            >
                                                                Transaction ID / UTR Number *
                                                            </label>
                                                            <input
                                                                id="transactionId"
                                                                type="text"
                                                                value={transactionId}
                                                                onChange={(e) =>
                                                                    setTransactionId(
                                                                        e.target.value.toUpperCase()
                                                                    )
                                                                }
                                                                placeholder="Enter Transaction ID"
                                                                className="input-field uppercase"
                                                                required
                                                            />
                                                            <p className="text-xs text-yellow-700 mt-2">
                                                                ℹ️ Enter the UTR/Transaction ID after making payment
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Register Button */}
                                            <button
                                                onClick={handleRegister}
                                                disabled={
                                                    registering ||
                                                    (event.paymentRequired &&
                                                        !transactionId)
                                                }
                                                className="btn-primary w-full"
                                            >
                                                {registering
                                                    ? "Registering..."
                                                    : "Register"}
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* QR Code Modal */}
            {showQRModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowQRModal(false)}
                >
                    <div className="relative max-w-3xl max-h-[90vh] bg-white p-2 rounded-lg">
                        <button
                            onClick={() => setShowQRModal(false)}
                            className="absolute top-0 right-0 -mt-10 -mr-2 text-white hover:text-gray-300 text-3xl font-bold"
                        >
                            &times;
                        </button>
                        <img
                            src={event.paymentQRCode}
                            alt="Payment QR Code Full Size"
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
