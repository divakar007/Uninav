import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { FaBell, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import './../../Assets/css/NotificationsPage.css';
import axios from "axios";
import {useUser} from "@clerk/clerk-react";

interface Notification {
    id: string;
    userId: string;
    subject: string;
    message: string;
    timestamp: string;
    read: boolean;
}

const NotificationsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const tabs = [
        { id: 'all', label: 'All Notifications', icon: <FaBell /> },
        { id: 'unread', label: 'Unread', icon: <FaEnvelope /> },
        { id: 'read', label: 'Read', icon: <FaExclamationTriangle /> }
    ];
    const {user} = useUser();

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await axios.get(`/notifications/get-notifications/${user?.emailAddresses}`, {
                headers : {
                    "Content-Type": "application/json",
                }
            });
            setNotifications(response.data);
        };
        fetchNotifications();
    }, [user?.emailAddresses]);


    function handleOnChange(id: string) {
        setActiveTab(id);
        if(id === "read") {
            setNotifications(notifications.filter(notification => notification.read));
        } else if (id === "unread") {
            setNotifications(notifications.filter(notification => !notification.read));
        }
    }

    return (
        <div className="notifications-container">
            <h1 className="notifications-title">Notifications</h1>

            <div className="notifications-tabs-wrapper">
                {tabs.map(tab => (
                    <motion.button
                        key={tab.id}
                        className={`notifications-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleOnChange(tab.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        {tab.label}
                        {tab.id === 'unread' && (
                            <span className="notification-badge">{notifications.length}</span>
                        )}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="notifications-content"
                >
                    {notifications
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by timestamp (descending)
                        .map((notification) => (
                            <div key={notification.id} className="notification-card">
                                <div className="notification-header">
                                    <FaBell className="notification-icon" />
                                    <span className="notification-time">{notification.timestamp}</span>
                                </div>
                                <h3 className="notification-title">{notification.subject}</h3>
                                <p className="notification-message">
                                    {notification.message}
                                </p>
                            </div>
                        ))
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default NotificationsPage;
