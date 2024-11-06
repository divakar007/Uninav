import React, {useContext, useState} from 'react';
import { Button, Container, Card, ListGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaThumbsUp, FaCheck, FaTimes, FaQuestion } from 'react-icons/fa';
import {useParams} from "react-router-dom";
import {EventContext} from "../context/EventContext";
import "../../Assets/css/EventDetailsPage.css"


const EventDetailsPage: React.FC = () => {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | ''>('');
    const events = useContext(EventContext);
    const { paramName } = useParams<{ paramName: string }>();
    const event = events.find(e=> e.id === paramName)
    console.log(event);
    const handleLike = () => {
        setLikeCount(likeCount + 1);
    };

    const handleRSVP = (status: 'yes' | 'no' | 'maybe') => {
        setRsvpStatus(status);
    };

    return (

        <div className={"container event-details-container"}>
        <Container className="my-5">
            {event &&
            <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" className={"event-details-image"} src={event.imageUrl || 'https://via.placeholder.com/800x400'}/>
                <Card.Body>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <div className="mb-3">
                        <p><FaCalendarAlt/> <strong>Date:</strong> {event.date}</p>
                        <p><FaClock/> <strong>Duration:</strong> {event.duration}</p>
                        <p><FaMapMarkerAlt/>
                            <strong>Location:</strong> {`${event.address.street}, ${event.address.city}, ${event.address.state}, ${event.address.zip}, ${event.address.country}`}
                        </p>
                        {event.what3wordsAddress && (
                            <p><strong>What3Words:</strong> {event.what3wordsAddress}</p>
                        )}
                        <p><strong>Organizer ID:</strong> {event.organizerId}</p>
                    </div>
                    <Button variant="outline-primary" className="me-2" onClick={() => handleRSVP('yes')}>
                        <FaCheck/> Yes
                    </Button>
                    <Button variant="outline-secondary" className="me-2" onClick={() => handleRSVP('maybe')}>
                        <FaQuestion/> Maybe
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleRSVP('no')}>
                        <FaTimes/> No
                    </Button>
                    <div className="mt-3">
                        <Button variant="outline-success" onClick={handleLike}>
                            <FaThumbsUp/> Like {likeCount > 0 && `(${likeCount})`}
                        </Button>
                    </div>
                    {rsvpStatus && (
                        <div className="mt-3">
                            <h5>Your RSVP: <span
                                className={`text-${rsvpStatus === 'yes' ? 'success' : rsvpStatus === 'no' ? 'danger' : 'warning'}`}>{rsvpStatus.toUpperCase()}</span>
                            </h5>
                        </div>
                    )}
                </Card.Body>
            </Card>
            }
            <ListGroup className="mb-4">
                <ListGroup.Item><strong>Attendees:</strong> {event?.attendees.join(', ') || 'No attendees yet'}
                </ListGroup.Item>
                <ListGroup.Item><strong>Maybe Attendees:</strong> {event?.maybeAttendees.join(', ') || 'None'}
                </ListGroup.Item>
                <ListGroup.Item><strong>Declined Attendees:</strong> {event?.declinedAttendees.join(', ') || 'None'}
                </ListGroup.Item>
            </ListGroup>
        </Container>
        </div>
    );
};

export default EventDetailsPage;
