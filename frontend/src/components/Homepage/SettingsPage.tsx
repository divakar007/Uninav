import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './../../Assets/css/SettingsPage.css';

const SettingsPage: React.FC = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        primaryEmail: '',
        phoneNumber: '',
        secondaryEmail: ''
    });

    useEffect(() => {
        // Fetch user details from your existing user login implementation
        const fetchUserDetails = async () => {
            // Replace with actual API call or context/state retrieval
            const user = {
                username: 'JohnDoe', // Example username
                primaryEmail: 'john.doe@example.com' // Example primary email
            };
            setUserDetails(prevDetails => ({
                ...prevDetails,
                username: user.username,
                primaryEmail: user.primaryEmail
            }));
        };

        fetchUserDetails();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <Container className="settings-page mt-4">
            {/* Header */}
            <div className="header-section">
                <h2 className="title">Settings</h2>
            </div>

            {/* User Details */}
            <div className="user-details-section mb-4">
                <h5 className="title">User Details</h5>
                <Row className="align-items-center mb-3">
                    <Col xs="auto">
                        <img src="path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
                    </Col>
                    <Col>
                        <p><strong>Username:</strong> {userDetails.username}</p>
                        <p><strong>Primary Email:</strong> {userDetails.primaryEmail}</p>
                    </Col>
                </Row>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Phone Number</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={userDetails.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Secondary Email</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="email"
                                name="secondaryEmail"
                                value={userDetails.secondaryEmail}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </div>

            {/* Notifications */}
            <div className="notifications-section">
                <Row className="mb-3">
                    <Col><strong>Notifications</strong></Col>
                    <Col xs="auto"><strong>Email</strong></Col>
                </Row>

                <Row className="notification-item align-items-center">
                    <Col>Alerts</Col>
                    <Col xs="auto">
                        <Form.Check type="switch" defaultChecked />
                    </Col>
                </Row>

                <Row className="notification-item align-items-center">
                    <Col>Events</Col>
                    <Col xs="auto">
                        <Form.Check type="switch" />
                    </Col>
                </Row>

                <Row className="notification-item align-items-center">
                    <Col>Giveaways</Col>
                    <Col xs="auto">
                        <Form.Check type="switch" />
                    </Col>
                </Row>
            </div>

            {/* Authentication */}
            <div className="danger-zone mt-4">
                <h5 className="text-danger">Verify Yourself</h5>
                <Row className="align-items-center">
                    <Col>
                        <strong>Verify Yourself in order to Post</strong>
                    </Col>
                    <Col xs="auto">
                        <Button variant="danger">Verify</Button>
                    </Col>
                </Row>
            </div>

            {/* Footer */}
            <div className="footer-section mt-4 d-flex justify-content-end">
                <Button variant="light" className="me-2">Cancel</Button>
                <Button variant="dark">Save changes</Button>
            </div>
        </Container>
    );
};

export default SettingsPage;