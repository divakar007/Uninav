import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import './../Assets/css/MapComponent.css';
import Tabs from './Homepage/Tabs';
import PostButton from './Homepage/PostButton';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import CurrentLocationButton from './Homepage/CurrentLocationButton';
import WeatherCard from './Homepage/WeatherCard';
import EventCard from "./Events/EventCard";
import { EventContext } from "./context/EventContext";
import { Event } from "./types/Event";
import { useLoadScript } from '@react-google-maps/api';
import SearchBar from './Homepage/SearchBar';

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
    const events = useContext(EventContext);
    const [currentEvent, setCurrentEvent] = useState<Event | undefined>(undefined);
    const [showEventCard, setShowEventCard] = useState<boolean>(false);
    const [eventPosition, setEventPosition] = useState<{ lat: number, lng: number } | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: MAP_API_KEY || '',
    });

    const handleMouseOver = (event: Event) => {
        setCurrentEvent(event);
        setEventPosition({ lat: event.latitude, lng: event.longitude });
        setShowEventCard(true);
    };

    const handleOnMouseOut = () => {
        setShowEventCard(false);
        setCurrentEvent(undefined);
        setEventPosition(null);
    };

    const handleCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = { lat: latitude, lng: longitude };
                    setCurrentLocation(newCenter);
                    setSelectedLatLng(newCenter);
                    if (mapRef.current) {
                        mapRef.current.panTo(newCenter);
                        mapRef.current.setZoom(15);
                    }
                    fetchWeatherData(newCenter).then();
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

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

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        if (lat !== undefined && lng !== undefined) {
            const clickedCoords = { lat, lng };
            setSelectedLatLng(clickedCoords);
            fetchWeatherData(clickedCoords);
        }
    };

    const handleCloseWeatherPopup = () => {
        setIsWeatherPopupVisible(false);
        setWeatherData(null);
    };

    const containerStyle = {
        width: '100%',
        height: '100vh',
    };

    const defaultCenter = {
        lat: 37.7749,
        lng: -122.4194,
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-wrapper">
            <div className="map-container">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentLocation || defaultCenter}
                    zoom={10}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                    onClick={handleMapClick}
                >
                    {currentLocation && !selectedLatLng && (
                        <Marker position={currentLocation}/>
                    )}

                    {selectedLatLng && (
                        <Marker position={selectedLatLng}/>
                    )}

                    {events.map(event => (
                        event.latitude && event.longitude ? (
                            <Marker
                                key={event.id}
                                position={{lat: event.latitude, lng: event.longitude}}
                                onMouseOver={() => handleMouseOver(event)}
                                onMouseOut={handleOnMouseOut}
                            />
                        ) : null
                    ))}

                    {showEventCard && currentEvent && eventPosition && (
                        <InfoWindow
                            position={eventPosition}
                            onCloseClick={handleOnMouseOut}
                            options={{pixelOffset: new window.google.maps.Size(0, -40)}}
                        >
                            <EventCard
                                id={currentEvent.id}
                                name={currentEvent.name}
                                imageUrl={currentEvent.imageUrl || ""}
                                description={currentEvent.description || ""}
                            />
                        </InfoWindow>
                    )}

                    <div style={{
                        position: 'absolute',
                        top: '7px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1
                    }}>
                        <SearchBar/>
                    </div>


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
            </div>
        </div>
    );
};

export default MapComponent;

