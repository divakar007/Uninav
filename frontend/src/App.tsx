import React from 'react';
import './App.css';
import MapComponent from "./components/MapComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import HamburgerMenu from "./components/Homepage/HamburgerMenu";
import PostEvent from "./components/Homepage/PostEvent";
import SettingsPage from "./components/Homepage/SettingsPage";
import Sidebar from "./components/Homepage/Sidebar";
import EventsPage from "./components/Events/EventsPage";
import Favorites from "./components/Homepage/Favorites";

// Set the base URL for Axios

function App() {
    axios.defaults.baseURL = 'http://localhost:8080/api';
    return (
        <Router basename="/Uninav">
            <div className="App">
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<MapComponent/>}/>
                    <Route path="/settings" element={<SettingsPage/>}></Route>
                    <Route path="/post" element={<PostEvent/>}/>
                    <Route path="/events" element={<EventsPage/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;