// apps/web/src/components/SearchBarWithFilters.tsx
import React, { useState } from 'react';

interface SearchBarWithFiltersProps {
  onSearch: (query: string) => void;
  onFilterCategory: (category: string) => void;
  onFilterLocation: (location: string) => void;
}

const SearchBarWithFilters: React.FC<SearchBarWithFiltersProps> = ({
  onSearch,
  onFilterCategory,
  onFilterLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Debounce the search input
    setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilterCategory(value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLocation(value);
    onFilterLocation(value);
  };

  return (
    <div className="flex space-x-4">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Search events..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select
        className="border p-2 rounded"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
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
      <select
        className="border p-2 rounded"
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="">All Locations</option>
        <option value="New York">New York</option>
        <option value="Art Gallery">Art Gallery</option>
        <option value="Convention Center">Convention Center</option>
        <option value="City Park">City Park</option>
        <option value="Culinary School">Culinary School</option>
        <option value="Wellness Center">Wellness Center</option>
        <option value="Bookstore">Bookstore</option>
        <option value="Community Center">Community Center</option>
        <option value="Tech Hub">Tech Hub</option>
        <option value="Open Field">Open Field</option>
        <option value="Market Square">Market Square</option>
        <option value="Dance Studio">Dance Studio</option>
        <option value="High School">High School</option>
        <option value="Vineyard">Vineyard</option>
        <option value="Downtown">Downtown</option>
        <option value="Theater">Theater</option>
      </select>
    </div>
  );
};

export default SearchBarWithFilters;

