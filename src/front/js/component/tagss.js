import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Tagss = () => {
  const { store, actions } = useContext(Context);
  const [loadingTagId, setLoadingTagId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTags = async () => {
      try {
        await actions.getTags();
        console.log("Tags obtenidos desde la API:", store.tags);
      } catch (error) {
        console.error("Error al traer los tags:", error);
      }
    };

    obtenerTags();
  }, []);

  const handleAgregarTags = () => {
    console.log("Tags actuales:", store.tags);
    navigate("/tags/new");
  };

  const handleEliminarTodosLosTags = () => {
    actions.getTags();
    console.log("Tags eliminados del estado local:", store.tags);
  };

  const handleEditarTag = (tagId) => {
    navigate(`/tags/edit/${tagId}`);
  };

  const handleEliminarTag = async (tagId) => {
    const confirmado = window.confirm("¿Estás seguro de que quieres eliminar este tag?");
    if (!confirmado) return;

    try {
      setLoadingTagId(tagId);

      const eliminado = await actions.eliminarTag(tagId);

      if (eliminado) {
        console.log(`Tag con id ${tagId} eliminado exitosamente`);
      } else {
        console.log(" No se pudo eliminar el tag");
        alert("No se pudo eliminar el tag. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al eliminar el tag:", error);
      alert("Ocurrió un error al eliminar el tag. Intenta nuevamente.");
    } finally {
      setLoadingTagId(null);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center space-y-4"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "2rem",
        color: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {store.tags && store.tags.length > 0 && (
        <div
          className="mt-4 w-full max-w-3xl"
          style={{
            backgroundColor: "#1f1f2f",
            borderRadius: "10px",
            padding: "1.5rem",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Tags disponibles:
          </h3>
          <ul
            className="list-none w-full space-y-2"
            style={{
              padding: "0",
              listStyleType: "none",
            }}
          >
            {store.tags.map((tag) => (
              <li
                key={tag.id}
                className="flex justify-between items-center w-full"
                style={{
                  backgroundColor: "#252540",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                }}
              >
                <span
                  className="text-gray-800 font-medium"
                  style={{
                    color: "#f5f5f5",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {tag.name}
                </span>
                <div className="flex space-x-2 justify-end">
                  <button
                    onClick={() => handleEditarTag(tag.id)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                    style={{
                      backgroundColor: "#6a11cb",
                      border: "none",
                      color: "#ffffff",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                    }}
                  >
                    Editar tag
                  </button>
                  <button
                    onClick={() => handleEliminarTag(tag.id)}
                    className={`text-red-500 hover:text-red-700 text-sm ${loadingTagId === tag.id ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loadingTagId === tag.id}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      cursor: loadingTagId === tag.id ? "not-allowed" : "pointer",
                      opacity: loadingTagId === tag.id ? "0.6" : "1",
                    }}
                  >
                    {loadingTagId === tag.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="flex space-x-4 mt-8"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          style={{
            backgroundColor: "#6a11cb",
            border: "none",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.2s ease",
          }}
          onClick={handleAgregarTags}
        >
          Agregar nuevo tag
        </button>
      </div>

      {store.tags.length === 0 && (
        <p
          className="mt-4 text-gray-500"
          style={{
            color: "#aaaaaa",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          No hay tags cargados.
        </p>
      )}
    </div>
  );

};

export default Tagss;
