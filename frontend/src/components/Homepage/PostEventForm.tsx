import React, {useEffect, useState} from 'react';
import { Form, Button, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap';
import { Event } from '../types/Event';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import './../../Assets/css/PostEventForm.css';
import axios from "axios";
import {useUser} from "@clerk/clerk-react";

const PostEventForm: React.FC = () => {
    const {user} = useUser();
    const [event, setEvent] = useState<Event>({
        id: '',
        name: 'Divakar Event',
        description: '',
        categoryId: '',
        organizerId: user?.id || "",
        what3wordsAddress: '',
        latitude: 0,
        longitude: 0,
        address: {
            street: '',
            apartmentNumber: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            phone: '',
        },
        date: '',
        time: '',
        attendees: [],
        maybeAttendees: [],
        declinedAttendees: [],
        duration: '',
        imageUrl: '',
        createdAt: '',
        updatedAt: '',
        eventType: 'Public',
    });

    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0); // Track upload progress
    // Add more input fields
    useEffect(() => {
        if (user?.id != null) {
            event.organizerId = user?.id;
        } // Trigger re-render to ensure the map loads
    }, []);
    const handleAddAttendee = (type: string) => {
        // Add logic to add attendees, maybe attendees, or declined attendees
    };


    function handleSubmit() {

    }

    function handleChange() {

    }

    function handleAddressChange() {

    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Filter only image files
            const selectedFiles = Array.from(e.target.files).filter(file =>
                file.type.startsWith('image/')
            );
            // Update state with selected image files
            setFiles(selectedFiles);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        try {
            await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total || 1; // Default to 1 to avoid division by zero
                    const progress = Math.round((progressEvent.loaded * 100) / total);
                    setUploadProgress(progress); // Update progress bar
                },
            });
            alert('Upload successful!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        }
    };

    function handleSelectLocation() {

    }

    return (
        <Form onSubmit={handleSubmit} className="post-event-form">
            {/* Existing Fields */}
            <h3 className="mb-4">Create Event</h3>

            {/* Category and Organizer */}
            <Form.Group controlId="name" className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={event.name}
                    onChange={handleChange}
                    placeholder="Enter Event Name"
                />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                    type="text area"
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                />
            </Form.Group>

            <Form.Group controlId="categoryId" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                    name="categoryId"
                    value={event.categoryId}
                    onChange={handleChange}
                >
                    <option>Select Category</option>
                    <option value="1">Conference</option>
                    <option value="2">Workshop</option>
                    <option value="3">Social</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="organizerId" className="mb-3">
                <Form.Label>Organizer</Form.Label>
                <Form.Control
                    type="text"
                    name="organizerId"
                    value={user?.firstName +" "+  user?.lastName|| ""}
                    disabled={true}
                />
            </Form.Group>

            {/* Date, Time, and Duration */}
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group controlId="eventDate">
                        <Form.Label>Date</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="date"
                                name="date"
                                value={event.date}
                                onChange={handleChange}
                                required
                            />
                            <InputGroup.Text>
                                <FaCalendarAlt />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="eventTime">
                        <Form.Label>Time</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="time"
                                name="time"
                                value={event.time}
                                onChange={handleChange}
                                required
                            />
                            <InputGroup.Text>
                                <FaClock />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="duration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="text"
                            name="duration"
                            value={event.duration}
                            onChange={handleChange}
                            placeholder="e.g., 3h 45m"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Location */}
            <Form.Group controlId="what3wordsAddress" className="mb-3">
                <Form.Label>Location</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        name="location"
                        value={event.what3wordsAddress}
                        onChange={handleChange}
                        placeholder="Choose Location"
                    />
                    <Button variant="outline-secondary" onClick={handleSelectLocation}>Select Location</Button>
                </InputGroup>
            </Form.Group>
            {/* Address Inputs */}
            <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Row>
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            name="street"
                            value={event.address?.street}
                            onChange={handleAddressChange}
                            placeholder="Street"
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            name="apartmentNumber"
                            value={event.address?.apartmentNumber}
                            onChange={handleAddressChange}
                            placeholder="Apartment Number"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="city"
                            value={event.address?.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="state"
                            value={event.address?.state}
                            onChange={handleAddressChange}
                            placeholder="State"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            name="zip"
                            value={event.address?.zip}
                            onChange={handleAddressChange}
                            placeholder="ZIP Code"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            name="country"
                            value={event.address?.country}
                            onChange={handleAddressChange}
                            placeholder="Country"
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={event.address?.phone}
                            onChange={handleAddressChange}
                            placeholder="Phone"
                        />
                    </Col>
                </Row>
            </Form.Group>

            {/* Event Type */}
            <Form.Group controlId="eventType" className="mb-3">
                <Form.Label>Event Type</Form.Label>
                <Form.Select
                    name="eventType"
                    value={event.eventType}
                    onChange={handleChange}
                >
                    <option>Public</option>
                    <option>Private</option>
                </Form.Select>
            </Form.Group>

            {/* Image URL */}
            <Form.Group controlId="uploadAttachments" className="mb-3">
                <Form.Label>Upload Attachments (Images Only)</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*" // Restrict to images only
                    multiple
                    onChange={handleFileChange}
                />

                {files.length > 0 && (
                    <div className="attachment-list mt-2">
                        {files.map((file, index) => (
                            <div className="attachment-item" key={index}>
                                <span className="attachment-name">{file.name}</span>
                                <span className="attachment-size">{(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                            </div>
                        ))}

                        {/* Progress bar */}
                        <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />

                        {/* Upload time estimate */}
                        <span className="upload-time">{uploadProgress}%</span>
                    </div>
                )}

                <Button className={"custom-button"} onClick={handleUpload} disabled={files.length === 0}>
                    Upload Files
                </Button>
            </Form.Group>

            {/* Display file list and progress bar */}


            {/* Upload Button */}



            {/* Attendees */}
            <Form.Group controlId="attendees" className="mb-3">
                <Form.Label>Attendees</Form.Label>
                <Button variant="outline-secondary" onClick={() => handleAddAttendee('attendees')}>
                    Add Attendee
                </Button>
            </Form.Group>

            {/* Submit and Cancel Buttons */}
            <div className="form-actions mt-4">
                <Button variant="outline-secondary" className="me-2">
                    Cancel
                </Button>
                <Button className={"custom-button"} type="submit">
                    Create Event
                </Button>
            </div>
        </Form>
    );
};

export default PostEventForm;
