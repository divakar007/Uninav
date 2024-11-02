import React, { useState, useEffect, useRef, useCallback } from 'react';
import './../Assets/css/MapComponent.css';
import Tabs from './Homepage/Tabs';
import PostButton from './Homepage/PostButton';
import axios from 'axios';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import UserDataLogger from './User/UserDataLogger';
import Button from 'react-bootstrap/Button';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Marker
import CurrentLocationButton from './Homepage/CurrentLocationButton';
import WeatherCard from './Homepage/WeatherCard';

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const MapComponent: React.FC = () => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number, lng: number } | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [isWeatherPopupVisible, setIsWeatherPopupVisible] = useState(false);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true); // Trigger re-render to ensure the map loads
    }, []);

    // Fetch Events from Backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/events/get-all-events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    // Handle Current Location
    const handleCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = { lat: latitude, lng: longitude };
                    setCurrentLocation(newCenter);
                    setSelectedLatLng(newCenter);
                    if (mapRef.current) {
                        mapRef.current.panTo(newCenter); // Center the map to current location
                        mapRef.current.setZoom(15); // Optional: Zoom in
                    }
                    fetchWeatherData(newCenter);
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    // Fetch Weather Data
    const fetchWeatherData = async ({ lat, lng }: { lat: number, lng: number }) => {
        setIsLoadingWeather(true);
        setWeatherError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
            );
            if (!response.ok) throw new Error('Weather data not available');
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

    // Handle map click to fetch weather for clicked location
    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        if (lat !== undefined && lng !== undefined) {
            const clickedCoords = { lat, lng };
            setSelectedLatLng(clickedCoords);
            fetchWeatherData(clickedCoords);
        }
    };

    // Close the weather popup
    const handleCloseWeatherPopup = () => {
        setIsWeatherPopupVisible(false);
        setWeatherData(null);
    };

    const containerStyle = {
        width: '100%',
        height: '100vh',
    };

    // Set initial map center and zoom
    const defaultCenter = {
        lat: 37.7749, // Example latitude
        lng: -122.4194, // Example longitude
    };

    return (
        <div className="map-wrapper">
            <div className="map-container">
                {isLoaded &&
                    <LoadScript googleMapsApiKey={MAP_API_KEY || ''}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={currentLocation || defaultCenter}
                            zoom={10}
                            onLoad={(map) => {
                                mapRef.current = map;
                            }}
                            onClick={handleMapClick}
                        >
                            {currentLocation && !selectedLatLng &&(
                                <Marker position={currentLocation}/>
                            )}

                            {selectedLatLng && (
                                <Marker position={selectedLatLng}/>
                            )}
                            <div className="current-location" style={{margin: '0 10px 10px 0'}}>
                                <CurrentLocationButton onClick={handleCurrentLocation}/>
                            </div>

                            <div className="tabs-container"><Tabs/></div>
                            <div className="post-button-container"><PostButton/></div>

                            {isWeatherPopupVisible && (
                                <WeatherCard
                                    isWeatherPopupVisible={isWeatherPopupVisible}
                                    isLoadingWeather={isLoadingWeather}
                                    weatherError={weatherError}
                                    weatherData={weatherData}
                                    closeWeatherPopup={handleCloseWeatherPopup}
                                />
                            )}
                        </GoogleMap>
                    </LoadScript>
                }
            </div>
        </div>
    );
};

export default MapComponent;