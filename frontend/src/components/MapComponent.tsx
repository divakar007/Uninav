import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { What3wordsMap, What3wordsAutosuggest } from '@what3words/react-components';
import './../Assets/css/MapComponent.css';
import CurrentLocationButton from './Homepage/CurrentLocationButton';
import Tabs from './Homepage/Tabs';
import PostButton from './Homepage/PostButton';
import axios from "axios";
import PostForm from "./PostForm";
import {SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/clerk-react";
import UserDataLogger from "./User/UserDataLogger";
import Button from "react-bootstrap/Button";
import SuppressErrorBoundary from "./Exception/SuppressErrorBoundary";
import ErrorBoundary from "./Exception/ErrorBoundary";
import WeatherCard from "./Homepage/WeatherCard";

const API_KEY = process.env.REACT_APP_WHAT3WORDS_API_KEY;
const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY // Google Maps API key
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY  // OpenWeatherMap API key

const MapComponent: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number, lng: number } | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [isWeatherPopupVisible, setIsWeatherPopupVisible] = useState(false);
    const [isCoordinatesVisible, setIsCoordinatesVisible] = useState(false);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const mapRef = useRef<any>(null);
    const [events, setEvents] = useState<any[]>([]);  // State for events
    const [coordinates, setCoordinates] = useState<any[]>([]);  // State for event coordinates
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const {user,isLoaded} = useUser();
    useEffect(() => {
        axios.get(`/events/get-all-events`)
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    // const convertWhat3WordsToCoords = async (events: any[]) => {
    //     const convertToCoordinatesClient = ConvertToCoordinatesClient.init(API_KEY);
    //     const coordsPromises = events.map(async (event) => {
    //         const options: ConvertToCoordinatesOptions = {words: event.what3wordsAddress};
    //         const result = await convertToCoordinatesClient.run(options);
    //         return { ...event, coordinates: result.coordinates };
    //     });
    //
    //     const coords = await Promise.all(coordsPromises);
    //     setCoordinates(coords);
    // };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setSelectedLatLng({ lat: latitude, lng: longitude });

                    if (mapRef.current && mapRef.current.map) {
                        mapRef.current.map.setCenter({ lat: latitude, lng: longitude });
                    }
                    fetchWeatherData({lat: latitude, lng: longitude}).then(r =>{});
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };



    const fetchWeatherData = async ({ lat, lng }: { lat: number, lng: number }) => {
        setIsLoadingWeather(true);
        setWeatherError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
            );
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            setWeatherData(data);
            setIsWeatherPopupVisible(true);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherError('Failed to fetch weather data. Please try again.');
        } finally {
            setIsLoadingWeather(false);
        }
    };

    const handleSquareSelect = (event: any) => {
        const { lat, lng } = event.detail.coordinates;
        setSelectedLatLng({ lat, lng });
        setIsCoordinatesVisible(true);
        fetchWeatherData({lat, lng}).then(r =>{});
    };

    useEffect(() => {
        const w3wMap = document.getElementById("w3w-map");
        if (w3wMap) {
            w3wMap.addEventListener("selected_square", handleSquareSelect);
        }
        return () => {
            if (w3wMap) {
                w3wMap.removeEventListener("selected_square", handleSquareSelect);
            }
        };
    }, []);

    const closeCoordinatesPopup = () => {
        setIsCoordinatesVisible(false);
    };

    const closeWeatherPopup = () => {
        setIsWeatherPopupVisible(false);
    };
    // const position = { lat: -25.344, lng: 131.031 };
    // const map = new google.maps.Map(
    //     document.getElementById('map') as HTMLElement,
    //     mapOptions
    // );
    //
    // const marker = new window.google.maps.marker.AdvancedMarkerElement({
    //     map: map,
    //     position: { lat: 37.4239163, lng: -122.0947209 },
    // });

    const [showForm, setShowForm] = useState(false);

    // Function to open the form when the post button is clicked
    const handlePostButtonClick = () => {
        setShowForm(true);
    };

    // Function to close the form
    const closeForm = () => {
        setShowForm(false);
    };

    const center = {
        lat: 37.7749, // San Francisco latitude
        lng: -122.4194 // San Francisco longitude
    };

    return (
        <div className="map-wrapper">
            <div className="tabs-container">
                <Tabs/>
            </div>
            <div className="post-button-container">
                <PostButton onClick={handlePostButtonClick}/>
            </div>

            <div className="user-profile-container">
                <SignedIn>
                    <UserButton >
                        <Button className="user-profile-button" variant="outline-success" size="lg">User</Button>
                    </UserButton>
                    <UserDataLogger/>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <Button className="user-signin-button" variant="outline-success" size="lg">SignIn</Button>
                    </SignInButton>
                </SignedOut>
            </div>

            {showForm && <PostForm onClose={closeForm}/>}
            <div className="map-container">
                <What3wordsMap
                    id="w3w-map"
                    api_key={API_KEY}
                    map_api_key={MAP_API_KEY}
                    zoom={18}
                    selected_zoom={20}
                    lng={currentLocation ? currentLocation.lng : -77.18941237551974}
                    lat={currentLocation ? currentLocation.lat : 38.89680649400657}
                    search_control_position={2}
                    map_type_control={true}
                    zoom_control={true}
                    fullscreen_control={true}
                    fullscreen_control_position={3}
                    current_location_control_position={9}
                    disable_default_ui={true}
                    words="filled.count.soap"
                    ref={mapRef}
                    style={{width: '100%', height: '100%'}}
                >
                    <div slot="map" style={{width: '100%', height: '100%'}}/>
                    <div slot="search-control" style={{margin: '10px 0 0 10px'}}>
                        <What3wordsAutosuggest>
                            <div className="what3words-autosuggest-container">
                                <input
                                    type="text"
                                    className='what3words-autosuggest-container'
                                    placeholder="Find your address"
                                    autoComplete="off"
                                />
                            </div>
                        </What3wordsAutosuggest>
                    </div>

                    <div slot="current-location-control" style={{margin: '0 10px 10px 0'}}>
                        <CurrentLocationButton onClick={handleCurrentLocation}/>
                    </div>
                </What3wordsMap>


                {/* Popup for selected event */}
                {selectedEvent && (
                    <div
                        slot="popup"
                        data-lat={selectedEvent.coordinates.lat}
                        data-lng={selectedEvent.coordinates.lng}
                        style={{backgroundColor: 'white', padding: '10px', border: '1px solid #ccc'}}
                    >
                        <h2>{selectedEvent.name}</h2>
                        <p>{selectedEvent.description}</p>
                        <p>Category: {selectedEvent.category}</p>
                        <p>Date: {new Date(selectedEvent.date).toLocaleString()}</p>
                        <button onClick={() => setSelectedEvent(null)}>Close</button>
                    </div>
                )}

                {isCoordinatesVisible && selectedLatLng && (
                    <div className="coordinates-popup" style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: 'white',
                        padding: '10px',
                        border: '1px solid black',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <button onClick={closeCoordinatesPopup} style={{float: 'right'}}>Close</button>
                        <h3>Coordinates</h3>
                        <p>Latitude: {selectedLatLng.lat.toFixed(6)}</p>
                        <p>Longitude: {selectedLatLng.lng.toFixed(6)}</p>
                    </div>
                )}

                <WeatherCard isWeatherPopupVisible={isWeatherPopupVisible} isLoadingWeather={isLoadingWeather} weatherError={weatherError} weatherData={weatherData} closeWeatherPopup={closeWeatherPopup}/>

            </div>
        </div>
    );
};

export default MapComponent;
