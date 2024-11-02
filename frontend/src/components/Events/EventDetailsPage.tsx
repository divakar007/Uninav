import React from 'react';
import { useParams } from 'react-router-dom';
import '../../Assets/css/EventDetailsPage.css';

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const event = {
        // Sample data
        id: '1',
        name: 'Event 1',
        description: 'Full description of the event.',
        eventType: 'Public',
        category: 'Conference',
        organizer: 'John Doe',
        date: '2023-10-01',
        time: '10:00 AM',
        duration: '3h',
        w3wLocation: 'word.word.word',
        address: {
            street: '123 Main St',
            apartmentNumber: '4B',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA',
            phone: '123-456-7890',
        },
        imageUrl: 'https://via.placeholder.com/300',
        coHosts: ['Jane Doe', 'Alice Smith'],
    };

    return (
        <div className="event-details-page">
            <img src={event.imageUrl} alt={event.name} className="event-details-image" />
            <div className="event-details-content">
                <h1 className="event-details-title">{event.name}</h1>
                <p className="event-details-description">{event.description}</p>
                <div className="event-details-info">
                    <p><strong>Type:</strong> {event.eventType}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Organizer:</strong> {event.organizer}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Duration:</strong> {event.duration}</p>
                    <p><strong>W3W Location:</strong> {event.w3wLocation}</p>
                    <p><strong>Address:</strong> {`${event.address.street}, ${event.address.apartmentNumber}, ${event.address.city}, ${event.address.state}, ${event.address.zip}, ${event.address.country}`}</p>
                    <p><strong>Phone:</strong> {event.address.phone}</p>
                    <p><strong>Co-Hosts:</strong> {event.coHosts.join(', ')}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;