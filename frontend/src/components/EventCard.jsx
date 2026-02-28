import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const deadline = new Date(event.registrationDeadline);
    const isDeadlinePassed = new Date() > deadline;

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <Link to={`/events/${event._id}`}>
            <div className="card hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="card-header pt-3 pb-4">
                    <h3 className="text-2xl font-bold truncate mb-1">{event.title}</h3>
                    {(event.department || event.clubName) && (
                        <div className="flex flex-col mt-2">
                            {event.department && (
                                <span className="text-gray-200/90 text-sm font-semibold truncate leading-tight">
                                    {event.department}
                                </span>
                            )}
                            {event.clubName && (
                                <span className="text-gray-400 font-bold text-xs uppercase tracking-wider mt-1 truncate">
                                    {event.clubName}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="card-body">
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-700">
                            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(eventDate)} at {event.time}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-700">
                            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.venue}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className={`badge ${isDeadlinePassed ? 'badge-danger' : 'badge-success'}`}>
                            {isDeadlinePassed ? 'Registration Closed' : `Register by ${formatDate(deadline)}`}
                        </span>
                        <span className="text-sm text-gray-500">
                            {event.registrationCount || 0} registered
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
