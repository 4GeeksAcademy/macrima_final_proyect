import React from "react";
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';


const PoiMarkers = ({ pois }) => {
  return (
    <>
      {pois.length > 0 && pois.map((poi) => (
        <AdvancedMarker
          key={poi.id || `${poi.latitude}-${poi.longitude}`} // fallback en caso de que no tenga id
          position={{ lat: poi.latitude, lng: poi.longitude }}
        >
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;




  