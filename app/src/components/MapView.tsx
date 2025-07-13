// components/MapView.tsx
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

export type MapLocation = {
  name: string;
  lat: number;
  lng: number;
  isSpecial?: boolean; // 特別なマーカーかどうかを示すフラグ
  address?: string; // 住所
  openTime?: string; // 営業時間
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
  const [selectedMarker, setSelectedMarker] = useState<MapLocation | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {locations.map((loc, index) => (
        <React.Fragment key={index}>
          <Marker
            position={{ lat: loc.lat, lng: loc.lng }}
            title={loc.name}
            icon={loc.isSpecial ? {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            } : undefined}
            onClick={() => setSelectedMarker(loc)}
          >
            {selectedMarker && selectedMarker.lat === loc.lat && selectedMarker.lng === loc.lng && (
              <InfoWindow
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div style={{ padding: '8px', minWidth: '200px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {selectedMarker.name}
                  </h3>
                  {selectedMarker.address && (
                    <p style={{ margin: '4px 0', fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
                      📍 {selectedMarker.address}
                    </p>
                  )}
                  {selectedMarker.openTime && (
                    <p style={{ margin: '4px 0', fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
                      🕒 {selectedMarker.openTime}
                    </p>
                  )}
                </div>
              </InfoWindow>
            )}
          </Marker>
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default MapView;
