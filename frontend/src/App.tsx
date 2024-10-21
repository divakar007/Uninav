import React from 'react';
import './App.css';
import MapComponent from "./components/MapComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import HamburgerMenu from "./components/Homepage/HamburgerMenu";

// Set the base URL for Axios

function App() {
    axios.defaults.baseURL = 'http://localhost:8080/api';
    return (
        <div className="App">

        <Router basename="/Uninav">
                <HamburgerMenu />
                {/*<main className="App-main flex-grow-1">*/}
                    <Routes>
                        <Route path="/" element={<MapComponent />} />
                        <Route path="/public" element={<MapComponent />} />
                        <Route path="/private" element={<MapComponent />} />
                        <Route path="/group" element={<MapComponent />} />
                        <Route path="/about" element={<h2>About Us</h2>} />
                        <Route path="/contact" element={<h2>Contact Us</h2>} />
                    </Routes>
                {/*</main>*/}
                {/*<Footer />*/}
        </Router>
        </div>
    );
}

export default App;
