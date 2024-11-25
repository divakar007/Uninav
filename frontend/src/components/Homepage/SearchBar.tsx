import React, { useState, useRef } from 'react';
import '../../Assets/css/SearchBar.css';
import { FaSearchLocation, FaMicrophone } from "react-icons/fa";

const SearchBar: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [searchText, setSearchText] = useState('');
    const recognitionRef = useRef<any>(null);

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
        <form action="#" className="search">
            <button type="button" className="search__button">
                <div className="search__icon">
                    <FaSearchLocation size={20} />
                </div>
            </button>
            <input
                type="text"
                className="search__input"
                placeholder="Search..."
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
