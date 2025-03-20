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
    <div className="flex flex-col items-center justify-center space-y-4">
      {store.tags && store.tags.length > 0 && (
        <div className="mt-4 w-full max-w-3xl"> 
          <h3 className="text-lg font-semibold mb-4">Tags disponibles:</h3>
          <ul className="list-none w-full space-y-2">
            {store.tags.map((tag) => (
              <li
                key={tag.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm w-full"
              >
              
                <span className="text-gray-800 font-medium">{tag.name}</span>
                <div className="flex space-x-2 justify-end">
                  <button
                    onClick={() => handleEditarTag(tag.id)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Editar tag
                  </button>

                  <button
                    onClick={() => handleEliminarTag(tag.id)}
                    className={`text-red-500 hover:text-red-700 text-sm ${loadingTagId === tag.id ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loadingTagId === tag.id}
                  >
                    {loadingTagId === tag.id ? "Eliminando..." : " Eliminar"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex space-x-4 mt-8">
        <button
          type="button"
          className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAgregarTags}
        >
          Agregar nuevo tag
        </button>

        <button
          type="button"
          className="btn btn-danger bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleEliminarTodosLosTags}
        >
          Eliminar todos los tags (local)
        </button>
      </div>

      {store.tags.length === 0 && (
        <p className="mt-4 text-gray-500">No hay tags cargados.</p>
      )}
    </div>
  );
};

export default Tagss;
