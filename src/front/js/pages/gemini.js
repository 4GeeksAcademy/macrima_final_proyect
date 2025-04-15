import React, { useState } from 'react';

const DrawingSuggestionForm = () => {
  const [protagonist, setProtagonist] = useState('');
  const [scene, setScene] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuggestion([]);
    setExpandedIndex(null);
    setLoading(true);

    if (!protagonist || !scene) {
      setError('Por favor, ingresa tanto el protagonista como la escena.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/suggest-drawing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ protagonist, scene }),
      });

      const data = await response.json();
      console.log('Respuesta cruda del backend:', data.suggestion);

      if (data.error) {
        setError(data.error);
      } else {
        try {
          const rawString = data.suggestion.substring(7, data.suggestion.length - 3);
          console.log('Raw string antes de parsear:', rawString);

          const parsed = JSON.parse(rawString);
          console.log('Resultado del JSON.parse:', parsed);

          if (Array.isArray(parsed)) {
            setSuggestion(parsed);
          } else {
            setError('La respuesta no es una lista válida.');
          }
        } catch (parseError) {
          console.error('Error al parsear la respuesta:', parseError);
          setError('No se pudo interpretar la respuesta del servidor.');
        }

        setProtagonist('');
        setScene('');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('Error al conectar con el servidor.');
    }

    setLoading(false);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container mt-4">
      <h1>Generador de Ideas de Wallpapers</h1>
      <p className="text-muted">
        ¿No tienes ideas para wallpapers? ¡Escribe un protagonista y una escena y te enviaremos cinco!
        Aprieta cada sugerencia y verás su detalle. ¡Bienvenido a crear lo que quieras!
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Protagonista (ej: dragón, guerrero)"
          value={protagonist}
          onChange={(e) => setProtagonist(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Escena (ej: volando sobre un castillo)"
          value={scene}
          onChange={(e) => setScene(e.target.value)}
        />
        <button
          type="submit"
          className="btn text-white"
          disabled={loading}
          style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}
        >
          Generar Idea
        </button>
      </form>

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {error && <p className="text-danger mt-3">{error}</p>}

      {Array.isArray(suggestion) && suggestion.length > 0 ? (
        <div className="mt-4">
          <h2>Sugerencias:</h2>
          <ul className="list-group">
            {suggestion.map((item, index) => (
              <li
                key={index}
                className="list-group-item"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleExpand(index)}
              >
                <strong>{index + 1}. {item.title}</strong>
                {expandedIndex === index && (
                  <div className="mt-2 text-secondary">
                    {item.prompt}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        suggestion.length === 0 &&
        !loading &&
        !error &&
        <p className="mt-3 text-secondary">No hay sugerencias aún.</p>
      )}
    </div>
  );
};

export default DrawingSuggestionForm;


