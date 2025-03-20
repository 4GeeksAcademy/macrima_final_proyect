import React from 'react';
import { useNavigate } from 'react-router-dom';


const ArtistaList = () => {

    const navigate = useNavigate()
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Botones de Colores</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => navigate('/artistasDelete')} style={{ backgroundColor: '#FF5733', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                    Delete
                </button>
                <button onClick={() => navigate('/artistasGet')} style={{ backgroundColor: '#33FF57', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                    Get
                </button>
                <button onClick={() => navigate("/artistaForm")} style={{ backgroundColor: '#3375FF', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                    Add
                </button>
                <button onClick={() => navigate("/updateArtista")} style={{ backgroundColor: '#FFD700', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default ArtistaList;
