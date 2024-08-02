// apps/web/src/pages/create-event.tsx
'use client';
import React, { useState } from 'react';

interface Event {
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

const CreateEventPage: React.FC = () => {
  const [event, setEvent] = useState<Event>({
    name: '',
    description: '',
    location: '',
    date: '',
    category: '',
    time: '',
    availableSeats: 0,
    price: 0,
    isFree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: checked,
      }));
    } else {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event created:', event);
    // Here you would typically send the event data to your server
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Time</label>
          <input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={event.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Literature">Literature</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Dance">Dance</option>
            <option value="Education">Education</option>
            <option value="Photography">Photography</option>
            <option value="Theater">Theater</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            value={event.availableSeats}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={event.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
            disabled={event.isFree}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFree"
            checked={event.isFree}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Free Event</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
