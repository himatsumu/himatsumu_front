// components/MapView.tsx
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

export type MapLocation = {
  name: string;
  lat: number;
  lng: number;
};

interface MapViewProps {
  locations: MapLocation[];
  center: { lat: number; lng: number };
}

const containerStyle = {
  width: "100%",
  height: "100dvh",
};

const MapView: React.FC<MapViewProps> = ({ locations, center }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;
