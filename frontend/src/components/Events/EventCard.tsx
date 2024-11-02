import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../Assets/css/EventCard.css';

interface EventCardProps {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, name, description, imageUrl }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleOptions = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        }
        setShowOptions((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderDropdown = () => (
        <div
            className="options-dropdown"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left, position: 'absolute' }}
        >
            <button onClick={() => alert('Edit option clicked')}>Edit</button>
            <button onClick={() => alert('Delete option clicked')}>Delete</button>
            <button onClick={() => alert('Share option clicked')}>Share</button>
        </div>
    );

    return (
        <div className="event-card">
            <img src={imageUrl} alt={name} className="event-card-image" />
            <div className="event-card-content">
                <h3 className="event-card-title">{name}</h3>
                <p className="event-card-description">{description}</p>
                <Link to={`/event/${id}`} className="event-card-link">View Full Post</Link>
                <div className="event-card-options">
                    <button ref={buttonRef} onClick={toggleOptions} className="options-button">⋮</button>
                    {showOptions && ReactDOM.createPortal(renderDropdown(), document.body)}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
