import React, { useContext, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import EventCard from './EventCard';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../Assets/css/EventsPage.css';
import { EventContext } from '../context/EventContext';
import { CategoryContext } from '../context/CategoryContext';

const EventsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('none');
    const [category, setCategory] = useState<string>('none');
    const categories = useContext(CategoryContext);
    const events = useContext(EventContext);
    const { user } = useUser();

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
        event.address?.street,
        event.address?.apartmentNumber,
        event.address?.city,
        event.address?.state,
        event.address?.zip,
        event.address?.country,
        event.address?.phone,
    ])));

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const filterEvents = (eventsToFilter: typeof events) => {
        return eventsToFilter.filter(event => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                event.name?.toLowerCase().includes(searchLower) ||
                event.description?.toLowerCase().includes(searchLower) ||
                event.eventType?.toLowerCase().includes(searchLower) ||
                event.categoryId?.toLowerCase().includes(searchLower) ||
                event.organizerId?.toLowerCase().includes(searchLower) ||
                event.date?.toLowerCase().includes(searchLower) ||
                event.duration?.toLowerCase().includes(searchLower) ||
                event.what3wordsAddress?.toLowerCase().includes(searchLower) ||
                event.address?.street?.toLowerCase().includes(searchLower) ||
                event.address?.apartmentNumber?.toLowerCase().includes(searchLower) ||
                event.address?.city?.toLowerCase().includes(searchLower) ||
                event.address?.state?.toLowerCase().includes(searchLower) ||
                event.address?.zip?.toLowerCase().includes(searchLower) ||
                event.address?.country?.toLowerCase().includes(searchLower) ||
                event.address?.phone?.toLowerCase().includes(searchLower);

            return (
                (filter === 'all' || event.name.includes(filter)) &&
                (sortOption === 'none' || event.name.includes(sortOption)) &&
                (category === 'none' || event.categoryId.includes(category)) &&
                matchesSearch
            );
        });
    };

    const allFilteredEvents = filterEvents(events);
    const myFilteredEvents = filterEvents(events.filter(event => event.organizerId === user?.id));

    const renderFilterBar = () => (
        <div className="filter-bar">
            <div style={{ width: '100%', flexGrow: 1 }}>
                <Autocomplete
                    freeSolo
                    options={searchSuggestions}
                    filterOptions={(options, { inputValue }) =>
                        inputValue.length === 0 ? [] : options
                    }
                    inputValue={searchQuery}
                    onInputChange={(_event: React.SyntheticEvent, newValue: string | null) => {
                        if (newValue !== null) setSearchQuery(newValue);
                    }}
                    getOptionLabel={(option) => option ? option.toString() : ''}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                        <TextField
                            {...params}
                            label="Search Posts..."
                            variant="outlined"
                            className="search-input"
                            fullWidth
                            style={{ width: '100%' }}
                        />
                    )}
                />
            </div>
            <div className="dropdowns">
                <select onChange={(e) => setSortOption(e.target.value)} value={sortOption} className="custom-dropdown">
                    <option value="none">None</option>
                    <option value="trending">Trending</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                    <option value="rating">Rating (High to Low)</option>
                </select>
                <select onChange={(e) => setCategory(e.target.value)} value={category} className="custom-dropdown">
                    <option value="none">None</option>
                    {categories.map(cat =>
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    )}
                </select>
            </div>
        </div>
    );

    return (
        <div className="event-cards-page">
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                sx={{ marginBottom: 2 }}
            >
                <Tab label="Discover Events" />
                <Tab label="My Events" />
            </Tabs>


            {renderFilterBar()}

            <div className="event-cards-container">
                {(activeTab === 0 ? allFilteredEvents : myFilteredEvents).map(event => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        description={event.description}
                        imageUrl={event.imageUrl?.valueOf() || ""}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
