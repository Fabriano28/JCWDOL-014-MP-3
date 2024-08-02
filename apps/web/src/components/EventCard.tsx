// apps/web/src/components/EventCard.tsx

import Link from 'next/link';
import { events } from '@/app/constants';

interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    category: string;
    time: string;
    availableSeats: number;
    price: number;
    isFree: boolean;
  }

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-gray-600">{event.date}</p>
      <p className="text-gray-600">{event.time}</p>
      <p className="text-gray-600">{event.category}</p>
      <p className="text-gray-600">
        {event.isFree ? 'Free' : `Price: Rp${event.price.toLocaleString()}`}
      </p>
      <p className="text-gray-600">Available Seats: {event.availableSeats}</p>
      <Link href={`/events/${event.id}`}>
        <button className='mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded'> View Details </button>
      </Link>
    </div>
  );
};

export default EventCard;
