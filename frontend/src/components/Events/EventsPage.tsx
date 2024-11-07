import React, { useState } from 'react';
import EventCard from './EventCard';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import '../../Assets/css/EventsPage.css';

const EventsPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('none');
    const [category, setCategory] = useState<string>('none');

    const events = [
        // Sample data
        { id: '1', name: 'Event 1', description: 'Description 1', eventType: 'Type 1', category: 'Category 1', organizer: 'Organizer 1', date: '2023-10-01', time: '10:00 AM', duration: '3h', w3wLocation: 'word.word.word', address: { street: '123 Main St', apartmentNumber: '4B', city: 'New York', state: 'NY', zip: '10001', country: 'USA', phone: '123-456-7890' }, imageUrl: 'https://via.placeholder.com/150', coHosts: ['Jane Doe', 'Alice Smith'] },
        { id: '2', name: 'Event 2', description: 'Description 2', eventType: 'Type 2', category: 'Category 2', organizer: 'Organizer 2', date: '2023-10-02', time: '11:00 AM', duration: '2h', w3wLocation: 'word.word.word', address: { street: '456 Elm St', apartmentNumber: '5A', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'USA', phone: '987-654-3210' }, imageUrl: 'https://via.placeholder.com/150', coHosts: ['John Doe', 'Bob Smith'] },
        // Add more events here
    ];

    const searchSuggestions = Array.from(new Set(events.flatMap(event => [
        event.name,
        event.description,
        event.eventType,
        event.category,
        event.organizer,
        event.date,
        event.time,
        event.duration,
        event.w3wLocation,
        event.address.street,
        event.address.apartmentNumber,
        event.address.city,
        event.address.state,
        event.address.zip,
        event.address.country,
        event.address.phone,
        ...event.coHosts
    ])));

    const filteredEvents = events.filter(event => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (filter === 'all' || event.name.includes(filter)) &&
            (sortOption === 'none' || event.name.includes(sortOption)) &&
            (category === 'none' || event.category.includes(category)) &&
            (
                event.name.toLowerCase().includes(searchLower) ||
                event.description.toLowerCase().includes(searchLower) ||
                event.eventType.toLowerCase().includes(searchLower) ||
                event.category.toLowerCase().includes(searchLower) ||
                event.organizer.toLowerCase().includes(searchLower) ||
                event.date.toLowerCase().includes(searchLower) ||
                event.time.toLowerCase().includes(searchLower) ||
                event.duration.toLowerCase().includes(searchLower) ||
                event.w3wLocation.toLowerCase().includes(searchLower) ||
                event.address.street.toLowerCase().includes(searchLower) ||
                event.address.apartmentNumber.toLowerCase().includes(searchLower) ||
                event.address.city.toLowerCase().includes(searchLower) ||
                event.address.state.toLowerCase().includes(searchLower) ||
                event.address.zip.toLowerCase().includes(searchLower) ||
                event.address.country.toLowerCase().includes(searchLower) ||
                event.address.phone.toLowerCase().includes(searchLower) ||
                event.coHosts.some(coHost => coHost.toLowerCase().includes(searchLower))
            )
        );
    });

    return (
        <div className="event-cards-page">
            <div className="filter-bar">
                <Autocomplete
                    freeSolo
                    options={searchSuggestions}
                    filterOptions={(options, { inputValue }) =>
                        inputValue.length === 0 ? [] : options
                    }
                    inputValue={searchQuery}
                    onInputChange={(event: React.SyntheticEvent, newValue: string | null) => {
                        if (newValue !== null) setSearchQuery(newValue);
                    }}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField
                            {...params}
                            label="Search Posts..."
                            variant="outlined"
                            className="search-input"
                        />
                    )}
                />
                <div className="dropdowns">
                    <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                        <option value="none">None</option>
                        <option value="trending">Trending</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                        <option value="rating">Rating (High to Low)</option>
                    </select>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="none">None</option>
                        <option value="social">Social Events</option>
                        <option value="academic">Academic Events</option>
                        <option value="career">Career Fairs & Networking</option>
                        <option value="sports">Sports and Recreation</option>
                        <option value="workshops">Workshops & Training</option>
                        <option value="alerts">Campus Alerts</option>
                        <option value="announcements">Announcements</option>
                        <option value="transportation">Transportation & Parking</option>
                        <option value="giveaways">Giveaways & Promotions</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div className="event-cards-container">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} {...event} />
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
