'use client'

import React, { useState, useEffect } from 'react';
import { events } from '@/app/constants';
import EventCard from '@/components/EventCard';
import SearchBarWithFilters from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const filtered = events.filter(event => {
      return (
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? event.category === selectedCategory : true) &&
        (selectedLocation ? event.location === selectedLocation : true)
      );
    });
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedLocation]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleFilterCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFilterLocation = (location: string) => {
    setSelectedLocation(location);
  };

  const indexOfLastEvent = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <SearchBarWithFilters
          onSearch={handleSearch}
          onFilterCategory={handleFilterCategory}
          onFilterLocation={handleFilterLocation}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <Pagination
        totalItems={filteredEvents.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;


