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
                // const data = await actions.getTag(tagId);
                const data = store.tags.find(tag => tag.id == id)

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
        return <p>Cargando datos del tag...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <div className="form-floating">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="floatingInputValue"
                        value={formInfo.name}
                        onChange={handleChange}
                        placeholder="Nombre del tag"
                    />
                    <label htmlFor="floatingInputValue">Nombre de tag</label>
                </div>

                <button type="submit" className="btn btn-success w-full">
                    Guardar cambios
                </button>
            </form>

            <button onClick={handleBack} className="btn btn-secondary w-full mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default EditarTag;


