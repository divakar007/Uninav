import * as React from 'react';
import '../../Assets/css/HamburgerMenu.css';
import { useState } from 'react';
import halflogo from '../../Assets/images/uninav_halflogo1.png';
import fulllogo from '../../Assets/images/uninav_fulllogo1.png';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import UserDataLogger from "../User/UserDataLogger";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const HamburgerMenu: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { user } = useUser();

    React.useEffect(() => {
        const mapWrapper = document.querySelector('.map-wrapper');
        if (mapWrapper) {
            if (isHovered) {
                mapWrapper.classList.add('expanded');
            } else {
                mapWrapper.classList.remove('expanded');
            }
        }
    }, [isHovered]);

    return (
        <div
            className={`hamburger-menu ${isHovered ? 'expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="logo-container">
                <img
                    src={isHovered ? fulllogo : halflogo}
                    alt="Logo"
                    className="logo"
                />
            </div>
            <div className="menu-item">
                <i className="icon">🏠</i>
                {isHovered && <Link to={"/"}>Home</Link>}
            </div>
            <div className="menu-item">
                <Link to="/events">
                    <i className="icon">📊</i>
                    {isHovered && <span>Events</span>}
                </Link>
            </div>
            <div className="menu-item">
                <i className="icon">🔔</i>
                {isHovered && <Link to={"/favorites"}>Favorites</Link>}
            </div>
            <div className="menu-item">
                <i className="icon">📅</i>
                {isHovered && <Link to={"/post"}>Post</Link>}
            </div>
            <div className="menu-item">
                <i className="icon">⚙️</i>
                {isHovered && <Link to={"/settings"}>Settings</Link>}
            </div>
            <div className="menu-footer">
                <div className="color-theme">
                    {isHovered && <span>Light mode</span>}
                    <i className="icon">🌙</i>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;