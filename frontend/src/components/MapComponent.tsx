import {
    What3wordsAutosuggest,
    What3wordsMap
} from "@what3words/react-components";

const API_KEY = "LYKOJZZO";
const MAP_API_KEY = "AIzaSyDIRFZk0OcgUFUn8Qw00te7r4mmls6eALI";

export default function MapComponent() {
    return (
        <div className="map-container">
            <What3wordsMap
                id="w3w-map"
                api_key={API_KEY}
                map_api_key={MAP_API_KEY}
                disable_default_ui={true}
                fullscreen_control={true}
                map_type_control={true}
                zoom_control={true}
                current_location_control_position={9}
                fullscreen_control_position={3}
                search_control_position={2}
                words="filled.count.soap"
                onError={(error: any) => {
                    console.error('Error loading map:', error); // Log any errors related to the map
                }}
            >
                <div slot="map" style={{ width: "100vw", height: "100vh" }} />
                <div slot="search-control" style={{ margin: "10px 0 0 10px" }} >
                    <What3wordsAutosuggest>
                        <input
                            type="text"
                            placeholder="Find your address"
                            style={{ width: "300px" }}
                            autoComplete="off"
                        />
                    </What3wordsAutosuggest>
                </div>
                <div slot="current-location-control" style={{ margin: "0 10px 10px 0" }}>
                    <button className="btn btn-primary">Locate Me</button>
                </div>
            </What3wordsMap>
        </div>
    );
}
