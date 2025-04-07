import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Context } from "../store/appContext";

const NewLocatedArtista = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
    address: "",
    password: ""
  });

  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    actions.getArtistasLocated(); 
  }, []);

  useEffect(() => {
    if (store.artistasLocated?.length > 0) {
      setArtists(store.artistasLocated);
    }
  }, [store.artistasLocated]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const location = await actions.fetchGeocode(formData.address);
      if (location) {
        const newArtista = {
          username: formData.username,
          email: formData.email,
          avatar: formData.avatar,
          password: formData.password,
          latitude: location.lat,
          longitude: location.lng,
        };

        const result = await actions.createLocatedArtista(newArtista);
        if (result) {
          setArtists([...artists, result]);
          setFormData({ username: "", email: "", avatar: "", password: "", address: "" });

          if (mapRef.current) {
            mapRef.current.panTo({ lat: result.latitude, lng: result.longitude });
            mapRef.current.setZoom(15);
          }
        }
      } else {
        console.error("Dirección inválida");
      }
    } catch (error) {
      console.error("Error al crear el artista:", error);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: -33.4489,
    lng: -70.6693,
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <h1>Mapa de Artistas</h1>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
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
              position={{ lat: selectedArtist.latitude, lng: selectedArtist.longitude }}
              onCloseClick={() => setSelectedArtist(null)}
            >
              <div>
                <strong>{selectedArtist.username}</strong>
                <p>{selectedArtist.email}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre del artista"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email del artista"
          required
        />
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="URL del avatar"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Dirección"
          required
        />
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
        />
        <button type="submit">Crear Artista</button>
      </form>
    </div>
  );
};

export default NewLocatedArtista;
