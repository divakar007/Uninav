import React, { useState } from 'react';
import './../../Assets/css/Sidebar.css';
import halflogo from '../../Assets/images/uninav_halflogo1.png';
import fulllogo from '../../Assets/images/uninav_fulllogo1.png';
import {FaHome, FaBell, FaChartBar, FaFolder, FaCalendar, FaUser, FaCog, FaHeart} from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import {Link} from "react-router-dom";
import {SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/clerk-react";
import UserDataLogger from "../User/UserDataLogger";
import Button from "react-bootstrap/Button";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useUser();

    // Get user's profile image, name, and email
    const profileImage = user?.imageUrl || 'https://via.placeholder.com/40';
    const profileName = user?.fullName || 'User Name';
    const profileEmail = user?.primaryEmailAddress?.emailAddress || 'user@example.com';
    // Toggle sidebar collapse
    const handleToggle = () => setIsCollapsed(!isCollapsed);

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="logo-section">
                <div className="logo-container">
                    <img
                        src={isCollapsed ? halflogo : fulllogo}
                        alt="Logo"
                        className="logo"
                    />
                </div>
                <button className="toggle-button" onClick={handleToggle}>
                    {isCollapsed ? <MdOutlineKeyboardArrowRight/> : <MdOutlineKeyboardArrowLeft/>}
                </button>
            </div>

            <ul className="nav-list">
                <li className="nav-item">
                    <FaHome className="nav-icon"/>
                    {!isCollapsed && (
                        <Link to="/" className="nav-label">
                            Home
                        </Link>
                    )}
                </li>
                <li className="nav-item">
                    <FaBell className="nav-icon"/>
                    {!isCollapsed && (
                        <Link to="/notifications" className="nav-label">
                            Notifications <span className="badge">10</span>
                        </Link>
                    )}
                </li>
                <li className="nav-item">
                    <FaFolder className="nav-icon"/>
                    {!isCollapsed && (
                        <Link to="/events" className="nav-label">
                            Events
                        </Link>
                    )}
                </li>
                <li className="nav-item">
                    <FaCalendar className="nav-icon"/>
                    {!isCollapsed && (
                        <Link to="/post" className="nav-label">
                            Post Event
                        </Link>
                    )}
                </li>
                <li className="nav-item">
                    <FaHeart  className="nav-icon"/>
                    {!isCollapsed && (
                        <Link to="/favorites" className="nav-label">
                            Favorites
                        </Link>
                    )}
                </li>
                <li className="nav-item">
                    <FaCog className="nav-icon"/>
                    {!isCollapsed && (
                        <Link to="/settings" className="nav-label">
                            Settings
                        </Link>
                    )}
                </li>
            </ul>

            <div className="profile-section">
                <SignedIn>
                    <UserButton
                        afterSignOutUrl="/Uninav" // Redirect to homepage or login page after sign out
                        appearance={{
                            elements: {
                                avatarBox: 'profile-img', // Apply custom class for styling
                            },
                        }}
                    />
                    {!isCollapsed && (
                        <div className="profile-details">
                            <span className="profile-name">{profileName}</span>
                            {/*<span className="profile-email">{profileEmail}</span>*/}
                        </div>
                    )}
                    <UserDataLogger/>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button className="user-signin-button" variant="outline-success" size="lg">SignIn</Button>
                    </SignInButton>
                </SignedOut>

            </div>
        </div>
    );
};

export default Sidebar;
