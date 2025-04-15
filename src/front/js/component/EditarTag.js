import React, { useState, useContext, useEffect } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const EditarTag = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);

    const [formInfo, setFormInfo] = useState({ name: '' });
    const [initialLoadDone, setInitialLoadDone] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Enviando datos al backend:", formInfo);

        const result = await actions.editarTag(id, formInfo);

        if (result) {
            console.log('Tag editado');
            navigate('/tags');
        } else {
            console.log('Tag no editado');
        }
    };

    const handleBack = () => {
        navigate('/tags');
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = store.tags.find(tag => tag.id == id);

                if (!initialLoadDone && data) { 
                    setFormInfo({ name: data.name || '' });
                    setInitialLoadDone(true); 
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error cargando los datos del tag', error);
                setIsLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (isLoading) {
        return (
            <div 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#121212",
                    color: "#f5f5f5",
                    fontSize: "1.2rem",
                }}
            >
                <p>Cargando datos del tag...</p>
            </div>
        );
    }

    return (
        <div 
            className="editar-tag-container"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#121212",
                padding: "2rem",
                color: "#f5f5f5",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <form 
                onSubmit={handleSubmit} 
                className="form-edit-tag"
                style={{
                    backgroundColor: "#1f1f2f",
                    borderRadius: "10px",
                    padding: "2rem",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <div className="form-floating" style={{ marginBottom: "1.5rem" }}>
    <input
        type="text"
        name="name"
        className="form-control"
        id="floatingInputValue"
        value={formInfo.name}
        onChange={handleChange}
        placeholder="Escribe el nombre del tag"
        style={{
            backgroundColor: "#1e1e1e",
            color: "#f5f5f5",
            border: "1px solid #424242",
            borderRadius: "5px",
            padding: "0.75rem",
            fontSize: "1rem",
            width: "100%",
        }}
        required
    />
</div>


                <button 
                    type="submit" 
                    className="btn btn-success w-full"
                    style={{
                        backgroundColor: "#6a11cb",
                        border: "none",
                        color: "#ffffff",
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Guardar Cambios
                </button>
            </form>

            <button 
                onClick={handleBack} 
                className="btn btn-secondary w-full mt-3"
                style={{
                    backgroundColor: "#3498db",
                    border: "none",
                    color: "#ffffff",
                    width: "100%",
                    maxWidth: "400px",
                    padding: "0.75rem",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    marginTop: "1rem",
                }}
            >
                Volver al menú de botones
            </button>
        </div>
    );
};

export default EditarTag;
