import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const SingleArtist = () => {
  const { artistaId } = useParams();
  const { actions } = useContext(Context);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      const data = await actions.getSingleArtist(artistaId);
      if (data) setArtist(data);
    };
    fetchArtist();
  }, [artistaId]);

  if (!artist) return <p>Cargando artista...</p>;

  return (
    <div>
      <h2>Detalle del Artista</h2>
      <p><strong>Email:</strong> {artist.email}</p>
      <p><strong>Username:</strong> {artist.username}</p>
      {artist.avatar && (
        <img src={artist.avatar} alt="Avatar" style={{ maxWidth: "200px" }} />
      )}
    </div>
  );
};

export default SingleArtist;
