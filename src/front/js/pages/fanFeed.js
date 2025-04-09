import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const FanFeedComents = () => {
  const { store, actions } = useContext(Context);
  const [comentarios, setComentarios] = useState({});
  const [nuevosComentarios, setNuevosComentarios] = useState({});
  const [comentariosCargados, setComentariosCargados] = useState(false);

  useEffect(() => {
    if (store.authFanFeed) {
      
      actions.getWallpapers();
    }
  }, [store.authFanFeed]);

  useEffect(() => {
    if (Array.isArray(store.wallPapers) && store.wallPapers.length > 0 && !comentariosCargados) {
      const fetchComentarios = async () => {
        for (const wp of store.wallPapers) {
          const coments = await actions.getComentsByWallpaperId(wp.id);
          setComentarios((prev) => ({ ...prev, [wp.id]: coments || [] }));
        }
        setComentariosCargados(true);
      };
      fetchComentarios();
    }
  }, [store.wallPapers, comentariosCargados]);

  const handleChangeComentario = (wallpaperId, value) => {
    setNuevosComentarios((prev) => ({ ...prev, [wallpaperId]: value }));
  };

  const handleSubmitComentario = async (wallpaperId) => {
    const fanId = store.feedData?.id;
    const content = nuevosComentarios[wallpaperId];

    if (!fanId || !content?.trim()) return;

    const success = await actions.createComentForWallpaper({
      content,
      fan_id: fanId,
      wallpaper_id: wallpaperId,
    });

    if (success) {
      const coments = await actions.getComentsByWallpaperId(wallpaperId);
      setComentarios((prev) => ({ ...prev, [wallpaperId]: coments || [] }));
      setNuevosComentarios((prev) => ({ ...prev, [wallpaperId]: "" }));
    }
  };

  const handleLogout = () => {
    actions.logoutFanFeed();
  };

  const wallpapers = Array.isArray(store.wallPapers) ? store.wallPapers : [];

  
  if (!store.authFanFeed) {
    return (
      <div>
        <p>No estás autenticado. <Link to="/fan/login/feed">Inicia sesión</Link></p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Wallpapers y Comentarios</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 12px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {wallpapers.length > 0 ? (
        wallpapers.map((wp) => (
          <div
            key={wp.id}
            style={{
              marginBottom: "40px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <h3>{wp.nombre || "Sin título"}</h3>
            <p>
              <strong>Artista:</strong> {wp.artista?.username || "Desconocido"}
            </p>
            <img
              src={wp.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen"}
              alt={wp.nombre || "Wallpaper"}
              style={{ maxWidth: "100%", height: "auto" }}
            />

            <h4>Comentarios</h4>
            {comentarios[wp.id]?.length > 0 ? (
              comentarios[wp.id].map((c) => (
                <div key={c.id} style={{ marginBottom: "8px" }}>
                  <strong>{c.fan?.username || "Fan anónimo"}</strong>: {c.content}
                </div>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}

            <textarea
              value={nuevosComentarios[wp.id] || ""}
              onChange={(e) => handleChangeComentario(wp.id, e.target.value)}
              placeholder="Escribe tu comentario..."
              rows={3}
              style={{ width: "100%", marginTop: "10px" }}
            />
            <button
              onClick={() => handleSubmitComentario(wp.id)}
              style={{ marginTop: "5px" }}
            >
              Comentar
            </button>
          </div>
        ))
      ) : (
        <p>Cargando wallpapers...</p>
      )}
    </div>
  );
};

export default FanFeedComents;






