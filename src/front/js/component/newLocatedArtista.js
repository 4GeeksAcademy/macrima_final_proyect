import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { getDistance } from "geolib";

const NewLocatedArtista = () => {
  const { store, actions } = useContext(Context);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getArtistasLocated();
  }, []);

  useEffect(() => {
    if (store.artistasLocated?.length > 0) {
      setArtists(store.artistasLocated);
    }
  }, [store.artistasLocated]);

  const isWithinDistanceGeolib = (artist, location, radiusKm = 10) => {
    const distanceMeters = getDistance(
      { latitude: artist.latitude, longitude: artist.longitude },
      { latitude: location.lat, longitude: location.lng }
    );
    return distanceMeters <= radiusKm * 1000;
  };

  const handlePlaceChanged = async () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      const address = place.formatted_address;
      const location = await actions.fetchGeocode(address);
      if (location) {
        setSearchAddress(address);
        setCurrentLocation(address);
        setLocationCoords(location);

        const nearby = store.artistasLocated.filter((artist) =>
          isWithinDistanceGeolib(artist, location)
        );
        setArtists(nearby);

        if (mapRef.current) {
          mapRef.current.panTo(location);
          mapRef.current.setZoom(13);
        }
      }
    }
  };

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const defaultCenter = {
    lat: -33.4489,
    lng: -70.6693,
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <h1>Mapa de Artistas</h1>

        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Buscar por ubicación..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", width: "60%" }}
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={locationCoords || defaultCenter}
          zoom={12}
          onLoad={(map) => (mapRef.current = map)}
        >
          {artists.map((artista) => (
            <Marker
              key={artista.id}
              position={{ lat: artista.latitude, lng: artista.longitude }}
              onClick={() => setSelectedArtist(artista)}
            />
          ))}

          {selectedArtist && (
            <InfoWindow
              position={{
                lat: selectedArtist.latitude,
                lng: selectedArtist.longitude,
              }}
              onCloseClick={() => setSelectedArtist(null)}
            >
              <div>
                <strong>{selectedArtist.username}</strong>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div style={{ marginTop: "30px" }}>
        <h2>
          Artistas en {currentLocation || "todas las ubicaciones"}
        </h2>
        {artists.length > 0 ? (
          artists.map((artista) => (
            <div
              key={artista.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <p>
                <strong>Nombre:</strong> {artista.username}
              </p>
              <p>
                <strong>Email:</strong> {artista.email}
              </p>
              <button onClick={() => navigate(`/single/artist/${artista.id}`)}>
                Detalle artista
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron artistas.</p>
        )}
      </div>
    </div>
  );
};

export default NewLocatedArtista;





