import React, { useContext, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import EventCard from './EventCard';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../Assets/css/EventsPage.css';
import { EventContext } from '../context/EventContext';
import { CategoryContext } from '../context/CategoryContext';
import { FaSearchLocation } from 'react-icons/fa';
import axios from 'axios';
import SuccessModal from '../Models/SuccessModel';

const EventsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('none');
    const [category, setCategory] = useState<string>('none');
    const categories = useContext(CategoryContext);
    const events = useContext(EventContext);
    const { user } = useUser();
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const searchSuggestions = Array.from(new Set(events.flatMap(event => [event.name])));

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const filterEvents = (eventsToFilter: typeof events) => {
        // Sort based on the selected sortOption
        const sortedEvents = [...eventsToFilter];
        if (sortOption === 'trending') {
            sortedEvents.sort((a, b) => {
                const aTrendingScore = (a.attendees?.length || 0) + (a.likes || 0);
                const bTrendingScore = (b.attendees?.length || 0) + (b.likes || 0);
                return bTrendingScore - aTrendingScore; // Descending order
            });
        }

        return sortedEvents.filter(event => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                event.name?.toLowerCase().includes(searchLower) ||
                event.description?.toLowerCase().includes(searchLower) ||
                event.type?.toLowerCase().includes(searchLower) ||
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
                (category === 'none' || event.categoryId.includes(category)) &&
                matchesSearch
            );
        });
    };

    const allFilteredEvents = filterEvents(events);
    const myFilteredEvents = filterEvents(events.filter(event => event.organizerId === user?.id));

    const handleOnDelete = (id: string, userId: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            axios
                .delete(`/event/delete-event`, {
                    data: { id, userId },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (response.data.status === 'success') {
                        setSuccessMessage('Event deleted successfully!');
                    } else {
                        setSuccessMessage('Event deletion failed!');
                    }
                    setShowSuccessModal(true);
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    setSuccessMessage('An error occurred while deleting the event.');
                    setShowSuccessModal(true);
                });
        }
    };

    const renderFilterBar = () => (
        <div className="filter-bar">
            <div className="search" style={{ width: '100%' }}>
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
                    getOptionLabel={option => (option ? option.toString() : '')}
                    style={{ width: '100%' }}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <button type="button" className="search__button">
                                <div className="search__icon">
                                    <FaSearchLocation size={20} />
                                </div>
                            </button>
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="standard"
                                className="search__input"
                                style={{ width: '100%' }}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                }}
                            />
                        </div>
                    )}
                />
            </div>
            <div className="dropdowns">
                <select
                    onChange={e => setSortOption(e.target.value)}
                    value={sortOption}
                    className="custom-dropdown"
                >
                    <option value="none">None</option>
                    <option value="trending">Trending</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                    <option value="rating">Rating (High to Low)</option>
                </select>
                <select
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                    className="custom-dropdown"
                >
                    <option value="none">None</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );

    function handleSuccessFormClose() {
        setShowSuccessModal(false);
        setSuccessMessage('');
        window.location.reload();
    }

    return (
        <div className="event-cards-page">
            <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ marginBottom: 2 }}>
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
                        imageUrl={event.imageUrl?.valueOf() || ''}
                        organizerId={event.organizerId}
                        onDelete={handleOnDelete}
                    />
                ))}
            </div>
            {showSuccessModal && (
                <SuccessModal
                    show={showSuccessModal}
                    message={successMessage}
                    onClose={handleSuccessFormClose}
                />
            )}
        </div>
    );
};

export default EventsPage;
