import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ route }) => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {route.map((point, index) => (
                <Marker key={index} position={point}>
                    <Popup>{point.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;