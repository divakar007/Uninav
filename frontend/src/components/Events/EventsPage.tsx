import React, {useContext, useState} from 'react';
import EventCard from './EventCard';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import '../../Assets/css/EventsPage.css';
import {EventContext} from "../context/EventContext";
import {CategoryContext} from "../context/CategoryContext";

const EventsPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('none');
    const [category, setCategory] = useState<string>('none');
    const categories = useContext(CategoryContext);
    const events = useContext(EventContext);

    const searchSuggestions = Array.from(new Set(events.flatMap(event => [
        event.id,
        event.name,
        event.description,
        event.eventType,
        event.categoryId,
        event.organizerId,
        event.date,
        event.duration,
        event.what3wordsAddress,
        event.address.street,
        event.address.apartmentNumber,
        event.address.city,
        event.address.state,
        event.address.zip,
        event.address.country,
        event.address.phone,
    ])));

    const filteredEvents = events.filter(event => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (filter === 'all' || event.name.includes(filter)) &&
            (sortOption === 'none' || event.name.includes(sortOption)) &&
            (category === 'none' || event.categoryId.includes(category)) &&
            (
                event.name.toLowerCase().includes(searchLower) ||
                event.description.toLowerCase().includes(searchLower) ||
                event.eventType.toLowerCase().includes(searchLower) ||
                event.categoryId.toLowerCase().includes(searchLower) ||
                event.organizerId.toLowerCase().includes(searchLower) ||
                event.date.toLowerCase().includes(searchLower) ||
                event.duration.toLowerCase().includes(searchLower) ||
                event.what3wordsAddress?.toLowerCase().includes(searchLower) ||
                event.address.street.toLowerCase().includes(searchLower) ||
                event.address.apartmentNumber?.toLowerCase().includes(searchLower) ||
                event.address.city.toLowerCase().includes(searchLower) ||
                event.address.state.toLowerCase().includes(searchLower) ||
                event.address.zip.toLowerCase().includes(searchLower) ||
                event.address.country.toLowerCase().includes(searchLower) ||
                event.address.phone?.toLowerCase().includes(searchLower)
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
                        {categories.map(cat =>
                            <option key={cat.id} value={cat.id} >{cat.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="event-cards-container">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} id={event.id} name={event.name} description={event.description} imageUrl={event.imageUrl?.valueOf() || ""}/>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
