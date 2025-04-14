import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const WallpaperComentarios = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    const cargarComentarios = async () => {
      const coments = await actions.getComentsByWallpaperId(paperId);
      setComentarios(coments || []);
    };

    if (paperId) {
      cargarComentarios();
    }
  }, [paperId]);

  const handleSubmitComentario = async () => {
    const fanId = store.fanFeedData?.id;

    if (!fanId || !nuevoComentario.trim()) return;

    const success = await actions.createComentForWallpaper({
      content: nuevoComentario,
      fan_id: fanId,
      wallpaper_id: paperId,
    });

    if (success) {
      const coments = await actions.getComentsByWallpaperId(paperId);
      setComentarios(coments || []);
      setNuevoComentario("");
    }
  };

  if (!store.authFan) {
    return <p>Inicia sesión como fan para ver y comentar.</p>;
  }

  return (
    <div className="mt-4">
      <h4>Comentarios</h4>

      <textarea
        className="form-control mt-2"
        rows={3}
        placeholder="Escribe tu comentario..."
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
      ></textarea>
      <button 
  onClick={handleSubmitComentario} 
  className="btn btn-primary mt-2 mb-3 me-2"
  style={{
    backgroundColor: "#6a11cb", 
    border: "none", 
    color: "#ffffff", 
    padding: "0.75rem 1.5rem", 
    borderRadius: "5px", 
    fontWeight: "bold", 
  }}
>
  Comentar
</button>

      <button onClick={() => navigate("/fan/feed")} className="btn btn-secondary mt-2 mb-3">
        Volver
      </button>

      {comentarios.length > 0 ? (
        comentarios.map((c) => (
          <div key={c.id} className="mb-2">
            <strong>{c.fan?.username || "Anónimo"}</strong>: {c.content}
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default WallpaperComentarios;

