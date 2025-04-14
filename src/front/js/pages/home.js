import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    // Datos dinámicos de las imágenes
    const imageList = [
        "https://m.media-amazon.com/images/S/pv-target-images/87bd8d9edc4fafda8377cdc6da823ca55cc8afe36dc855d4a4b311716c69b521.jpg", // Ejemplo de fondo de juego
        "https://i0.wp.com/xn--oo-yjab.cl/wp-content/uploads/2014/05/adv-figura-yoshi-mario-bros-nintendo.jpg?fit=760%2C350&ssl=1", // Ejemplo de fondo de serie
        "https://autismodiario.com/wp-content/uploads/2015/12/starwars.jpg", // Ejemplo de fondo de arte
    ];

    return (
        <div
            className="text-center mb-3"
            style={{
                backgroundColor: "#1e1e2f",
                color: "#f5f5f5",
                padding: "3rem",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                fontFamily: "'Poppins', sans-serif",
               
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginBottom: "2rem",
                    color: "#6a0dad", // Color morado
                    textShadow: "0 4px 8px rgba(0, 0, 0, 0.8)", // Sombra del texto
                }}
            >
                ¡Bienvenido a Macrima!
            </h1>

            <p>
                <img
                    src="https://tse4.mm.bing.net/th?id=OIG1.Away7q3NvmNFCzENU2HH&pid=ImgGn"
                    alt="Rigo Baby"
                    style={{
                        borderRadius: "50%",
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        boxShadow: "0 4px 8px rgba(255, 255, 255, 0.2)",
                    }}
                />
            </p>
            <p
                style={{
                    fontSize: "1.25rem",
                    marginBottom: "2rem",
                    lineHeight: "1.6",
                    color: "#f8f9fa",
                    textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
                }}
            >
                ¡Descubre y personaliza tu mundo con los mejores <strong>fondos de pantalla</strong> inspirados en tus <em>juegos</em>, 
                <em>series</em> y mucho más!
            </p>

            {/* Recuadros dinámicos generados con map */}
            <div
                style={{
                    marginTop: "3rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "2rem",
                }}
            >
                {imageList.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "10px",
                            minHeight: "150px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                        aria-label={`Imagen ${index + 1}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};
