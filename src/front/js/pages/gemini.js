import React, { useState } from 'react';

const DrawingSuggestionForm = () => {
  const [protagonist, setProtagonist] = useState('');
  const [scene, setScene] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuggestion('');
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

      if (data.error) {
        setError(data.error);
      } else {
        setSuggestion(data.suggestion);
        setProtagonist(''); 
        setScene(''); 
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h1>Generador de Ideas de Wallpapers</h1>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
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

      {suggestion && (
        <div className="mt-4">
          <h2>Sugerencia:</h2>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default DrawingSuggestionForm;


