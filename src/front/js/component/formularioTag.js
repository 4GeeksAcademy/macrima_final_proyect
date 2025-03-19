import React, { useState, useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
    const navigate = useNavigate()
    const { actions } = useContext(Context);
    const [formInfo, setFormInfo] = useState({name:''})

    
    const handleChange = (e) => {
        setFormInfo({...formInfo,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.agregarTags(formInfo)
        if (result) {
            console.log('tag creado')
            navigate('/viewtags')
        }
        else {console.log('tag no creado')}
    } 
    const handleBackToMenu = () => {
        navigate('/'); 
    };


    return (
        <>
        
        <form onSubmit={handleSubmit} className="form-floating">
            <input onChange={handleChange} name='name' type="text" className="form-control" id="floatingInputValue" value={formInfo.name}/>
            <label htmlFor="floatingInputValue">Nombre de tag</label>
            <button type="submit" className="btn btn-success">Agregar tag</button>
        </form>
        <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menu de botones
            </button>
        
        
        </>
    )
}

export default Formulario