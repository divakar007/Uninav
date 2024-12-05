import React, { useState, useRef, useEffect } from 'react';
import '../../Assets/css/SearchBar.css';
import { FaSearchLocation, FaMicrophone } from "react-icons/fa";

interface SearchBarProps {
    map: google.maps.Map | null;
    onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ map, onPlaceSelect }) => {
    const [isListening, setIsListening] = useState(false);
    const [searchText, setSearchText] = useState('');
    const recognitionRef = useRef<any>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        if (window.google && window.google.maps && searchInputRef.current && map) {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                searchInputRef.current,
                {
                    types: ['geocode', 'establishment'],
                    componentRestrictions: { country: 'us' }
                }
            );

            const placeChangedListener = autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current?.getPlace();

                if (place && place.geometry && map) {
                    setSearchText(place.name || '');

                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else if (place.geometry.location) {
                        map.panTo(place.geometry.location);
                        map.setZoom(15);
                    }

                    if (onPlaceSelect) {
                        onPlaceSelect(place);
                    }

                    console.log('Selected Place:', {
                        name: place.name,
                        address: place.formatted_address,
                        location: place.geometry.location?.toJSON()
                    });
                }
            });

            return () => {
                if (placeChangedListener) {
                    placeChangedListener.remove();
                }
            };
        }
    }, [map]);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission
    };

    const startListening = () => {
        if ('webkitSpeechRecognition' in window) {
            recognitionRef.current = new (window as any).webkitSpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setSearchText(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.start();
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <form action="#" className="search" onSubmit={handleFormSubmit}>
            <button type="button" className="search__button">
                <div className="search__icon">
                    <FaSearchLocation size={20} />
                </div>
            </button>
            <input
                ref={searchInputRef}
                type="text"
                className="search__input"
                placeholder="Search locations..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button
                type="button"
                className={`mic__button ${isListening ? 'listening' : ''}`}
                onClick={handleMicClick}
            >
                <div className="mic__icon">
                    <FaMicrophone size={20} />
                </div>
            </button>
        </form>
    );
};

export default SearchBar;
