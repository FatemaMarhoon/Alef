'use client'
import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "./common/Loader";


interface MapComponentProps {
    initialLatitude: number;
    initialLongitude: number;
    onLocationChange: (latitude: number, longitude: number) => void;

}


export default function Map({ initialLatitude, initialLongitude, onLocationChange }: MapComponentProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCWkOL5KrLFbG0hluLfQdKSuM0IkrB_uQQ",
    });

    const center = useMemo(() => ({ lat: initialLatitude, lng: initialLongitude }), []);
    const [selectedLocation, setSelectedLocation] = useState(center);

    const handleClick = (latLng: google.maps.LatLng | null) => {
        if (latLng)
            setSelectedLocation({ lat: latLng.lat(), lng: latLng.lng() });
        console.log(
            `Selected location: Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lng}`
        );
    };

    useEffect(() => {
        // Notify the parent component of the location change
        onLocationChange(selectedLocation.lat, selectedLocation.lng);
    }, [onLocationChange, selectedLocation]);

    if (!isLoaded) return <div><Loader></Loader></div>;
    return (<>
        <div className="mb-4">
            <GoogleMap zoom={15}
                center={selectedLocation}
                mapContainerStyle={{ width: "100%", height: "60vh" }}
                onClick={(e) => handleClick(e.latLng)}
            >
                <Marker position={selectedLocation} />
            </GoogleMap>
        </div>
    </>);
}