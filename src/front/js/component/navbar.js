import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import LogoutFeedArtista from "../component/logoutArtistaFeed";
import LogoutButton from "./logoutButton";

export const Navbar = () => {
    const { store } = useContext(Context);
    return (
        <>
            <style>
                {`
                    .navbar {
                        background: linear-gradient(135deg, #6a11cb, #2575fc);
                        padding: 0.3rem 1rem;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .navbar-brand img {
                        height: 45px;
                        margin-right: 0.5rem;
                    }

                    .nav-link {
                        color: #e0e0e0 !important;
                        font-size: 1.1rem; 
                        margin: 0 0.8rem; 
                        transition: color 0.3s ease;
                    }

                    .nav-link:hover {
                        color: #fff !important;
                        text-decoration: underline;
                    }

                    .navbar-toggler {
                        border: none;
                    }

                    .navbar-toggler-icon {
                        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
                    }

                    .dropdown-menu {
                        font-size: 1.1rem; 
                    }

                    .dropdown-item:hover {
                        background-color: #6a11cb;
                        color: #fff;
                    }

                    .button-container {
                        margin-left: auto; 
                        display: flex; 
                        align-items: center;
                    }
                `}
            </style>

            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="https://tse4.mm.bing.net/th?id=OIG1.Away7q3NvmNFCzENU2HH&pid=ImgGn"
                            alt="Macrima Logo"
                            style={{
                                height: "60px",
                                width: "60px",
                                borderRadius: "50%",
                                overflow: "hidden",
                            }}
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">

                            {!store.authFan &&
                                <li className="nav-item dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle nav-link"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <strong>Artista</strong>
                                    </button>
                                    <ul className="dropdown-menu">
                                        {!store.authArtistaFeed &&
                                            <>
                                                <li>
                                                    <Link to="/inicio-artista" className="dropdown-item">
                                                        Registrarme
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/loginF-artista" className="dropdown-item">
                                                        Iniciar Sesión
                                                    </Link>
                                                </li>
                                            </>
                                        }
                                        {store.authArtistaFeed &&
                                            <>
                                                <li>
                                                    <Link to="/feed-artista" className="dropdown-item">
                                                        Inicio
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/editar-artista" className="dropdown-item">
                                                        Editar Perfil
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/publicar-wallpaper" className="dropdown-item">
                                                        Publicar Wallpaper
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/tags" className="dropdown-item">
                                                        Crear Tags
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/gemini" className="nav-link">
                                                        Gemini
                                                    </Link>
                                                </li>
                                            </>
                                        }
                                    </ul>
                                </li>
                            }
                            {!store.authArtistaFeed &&
                            
                                <li className="nav-item dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle nav-link"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <strong>Fan</strong>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/registro_fan" className="dropdown-item">
                                                Registrarme
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/login_fan" className="dropdown-item">
                                                Iniciar Sesión
                                            </Link>
                                        </li>
                                        {store.authFan &&
                                        
                                            <>
                                                <li>
                                                    <Link to="/perfil" className="dropdown-item">
                                                        Editar Perfil
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/artistas/located/new" className="nav-link">
                                                        Artista por ubicación
                                                    </Link>
                                                </li>
                                            </>                                                                                    
                                        }
                                    </ul>                              
                                </li>
                                
                            }
                        </ul>
                        <div className="button-container">
                                            <LogoutButton />
                        </div>

                        <div className="button-container">
                            <LogoutFeedArtista />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
