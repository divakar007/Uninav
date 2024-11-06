import React from 'react';
import './../../Assets/css/Sidebar.css';
import halflogo from '../../Assets/images/uninav_halflogo1.png';
import fulllogo from '../../Assets/images/uninav_fulllogo1.png';
import {FaHome, FaBell, FaChartBar, FaFolder, FaCalendar, FaUser, FaCog, FaHeart, FaAd} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import UserDataLogger from "../User/UserDataLogger";
import Button from "react-bootstrap/Button";

const Sidebar: React.FC = () => {
    const { user } = useUser();

    // Get user's profile image, name, and email
    const profileImage = user?.imageUrl || 'https://via.placeholder.com/40';
    const profileName = user?.fullName || 'User Name';
    const profileEmail = user?.primaryEmailAddress?.emailAddress || 'user@example.com';

    return (
        <div className="sidebar">
            <div className="logo-section">
                <div className="logo-container">
                    <img
                        src={halflogo}
                        alt="Logo"
                        className="logo collapsed-logo"
                    />
                    <img
                        src={fulllogo}
                        alt="Logo"
                        className="logo expanded-logo"
                    />
                </div>
            </div>

            <ul className="nav-list">
                <Link to="/" className="nav-item">
                    <FaHome className="nav-icon" />
                    <span className="nav-label">Home</span>
                </Link>
                <Link to="/notifications" className="nav-item">
                    <FaBell className="nav-icon" />
                    <span className="nav-label">Notifications <span className="badge">10</span></span>
                </Link>
                <Link to="/events" className="nav-item">
                    <FaFolder className="nav-icon" />
                    <span className="nav-label">Events</span>
                </Link>
                <Link to="/post" className="nav-item">
                    <FaCalendar className="nav-icon" />
                    <span className="nav-label">Post Event</span>
                </Link>
                <Link to="/favorites" className="nav-item">
                    <FaHeart className="nav-icon" />
                    <span className="nav-label">Favorites</span>
                </Link>
                <Link to="/settings" className="nav-item">
                    <FaCog className="nav-icon" />
                    <span className="nav-label">Settings</span>
                </Link>
                { user && user.primaryEmailAddress && "adivakararao@vt.edu" === user.primaryEmailAddress.toString()  && (
                    <Link to="/adminpage" className="nav-item">
                        <FaAd className="nav-icon" />
                        <span className="nav-label">Admin</span>
                    </Link>
                )
                }
            </ul>

            <div className="profile-section">
                <SignedIn>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: 'profile-img',
                            },
                        }}
                    />
                    <div className="profile-details">
                        <span className="profile-name">{profileName}</span>
                    </div>
                    <UserDataLogger />
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
