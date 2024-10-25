import React from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import './../../Assets/css/SettingsPage.css';

const SettingsPage: React.FC = () => {
    return (
        <Container className="settings-page mt-4">
            {/* Header */}
            <div className="header-section">
                <h2 className="title">Notification preferences</h2>
                <p className="subtitle">
                    We are here to bring you the latest update that enhances your experience and improves functionality.
                </p>
                <div className="alert alert-primary d-flex justify-content-between align-items-center">
                    <span>You can now see all device notifications.</span>
                    <Button variant="link" className="text-light">
                        Undo
                    </Button>
                </div>
            </div>

            {/* Notifications */}
            <div className="notifications-section">
                <Row className="mb-3">
                    <Col><strong>Notifications</strong></Col>
                    <Col xs="auto"><strong>Email</strong></Col>
                    <Col xs="auto"><strong>Push</strong></Col>
                </Row>

                <Row className="notification-item align-items-center">
                    <Col>Your transfers and balances</Col>
                    <Col xs="auto">
                        <Form.Check type="checkbox" defaultChecked />
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="checkbox" defaultChecked />
                    </Col>
                </Row>

                <Row className="notification-item align-items-center">
                    <Col>Your debit card</Col>
                    <Col xs="auto">
                        <Form.Check type="checkbox" />
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="checkbox" />
                    </Col>
                </Row>

                <Row className="notification-item align-items-center">
                    <Col>Currencies and features</Col>
                    <Col xs="auto">
                        <Form.Check type="checkbox" />
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="checkbox" defaultChecked />
                    </Col>
                </Row>
            </div>

            {/* Admins */}
            <div className="admins-section mt-4">
                <h5>Admins</h5>
                <Row className="admin-item align-items-center">
                    <Col xs="auto">
                        <img src="/path/to/admin-avatar.jpg" alt="Admin" className="admin-avatar" />
                    </Col>
                    <Col>
                        <strong>Helena Rodriguez</strong>
                        <p className="text-muted">Owner</p>
                    </Col>
                    <Col xs="auto">
                        <Form.Select defaultValue="full">
                            <option value="full">Full access</option>
                            <option value="restricted">Restricted access</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>

            {/* Danger Zone */}
            <div className="danger-zone mt-4">
                <h5 className="text-danger">Danger zone</h5>
                <Row className="align-items-center">
                    <Col xs="auto">
                        {/* Add user avatars dynamically here */}
                        <img src="/path/to/user-avatar.jpg" alt="User" className="user-avatar" />
                    </Col>
                    <Col>
                        <strong>Disable all notifications for all users in your workspace</strong>
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="switch" id="disable-all" />
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
