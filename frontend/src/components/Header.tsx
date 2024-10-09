import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import "../Assets/css/header.css"

const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Left section: Logo and Navigation Links */}
                <a className="navbar-brand" href="/">
                    <img className="title-logo-img" src={require("../Assets/images/letter-logo.png")} alt="logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/public">Public</a>
                        </li>
                        <SignedIn>
                            <li className="nav-item">
                                <a className="nav-link" href="/private">Private</a>
                            </li>
                        </SignedIn>
                        <SignedOut>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Private</a>
                            </li>
                        </SignedOut>

                        {/* Group button - Disabled if user is not signed in */}
                        <SignedIn>
                            <li className="nav-item">
                                <a className="nav-link" href="/group">Group</a>
                            </li>
                        </SignedIn>
                        <SignedOut>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Group</a>
                            </li>
                        </SignedOut>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                    <Form className="d-flex me-3">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline-success">SignIn</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}

export default Header;
