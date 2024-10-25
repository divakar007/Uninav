// WeatherCard.tsx
import React from 'react';
import './../../Assets/css/WeatherCard.css';

interface WeatherCardProps {
    isVisible: boolean,
    isLoading: boolean,
    error: string | null,
    data: any,
    onClose: () => void,
}

const WeatherCard: React.FC<WeatherCardProps> = ({
                                                     isVisible,
                                                     isLoading,
                                                     error,
                                                     data,
                                                     onClose,
                                                 }) => {
    if (!isVisible) return null;

    return (
        <div className="weather-popup">
            <button className="close-button" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
            <h3 className="title">Weather Information</h3>
            {isLoading ? (
                <p>Loading weather data...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : data ? (
                <div className="weather-card">
                    <div className="temperature">{data.main.temp.toFixed(1)}°C</div>
                    <div className="details-grid">
                        <div className="details-item">Real Feel: {data.main.feels_like.toFixed(1)}°C</div>
                        <div className="details-item">Pressure: {data.main.pressure} hPa</div>
                        <div className="details-item">Wind Speed: {data.wind.speed} m/s</div>
                        <div className="details-item">Humidity: {data.main.humidity}%</div>
                    </div>
                    <div className="bottom-info">
                        <div className="weather">{data.weather[0].description}</div>
                        <div className="location">{data.name}</div>
                    </div>
                </div>
            ) : (
                <p>No weather data available</p>
            )}
        </div>
    );
};

export default WeatherCard;
