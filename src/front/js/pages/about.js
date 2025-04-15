import React, { useContext } from "react";
import { Context } from "../store/appContext";

const About = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container position-relative zindex-5 pt-5">
      <div className="row">
        {/* Sección principal */}
        <div className="col-lg-6">
          <h1 className="pb-2 pb-md-3 text-center">Sobre Macrima</h1>
          <p
            className="fs-xl pb-4 mb-1 mb-md-2 mb-lg-3"
            style={{ maxWidth: "526px", textAlign: "justify", margin: "0 auto" }}
          >
            Somos un grupo de estudiantes del bootcamp de 4geeks
            (Programador Full Stack), nuestro proyecto está centrado
            en la creación y el consumo de Fondos de Pantalla para
            tu ordenador. En nuestra página tendrás dos opciones: <br />
            <strong>1-</strong> Si te gusta crear contenido y
            destapar tu imaginación, tienes la opción de unirte como
            ARTISTA, donde podrás publicar tus creaciones. Los
            demás usuarios podrán ver tu contenido, comentarlo,
            apoyarte siguiendo tu perfil y valorando tus
            publicaciones con un like. <br />
            <strong>2-</strong> Podrás unirte como Fan para ver el
            contenido publicado en la página, valorarlo, tener un
            apartado con tus fondos favoritos, ver qué artistas
            sigues y muchas opciones más. <br />
            <strong>3-</strong> Si quieres formar parte de ambas
            opciones y disfrutar lo mejor de cada una de ellas,
            puedes tener una cuenta como fan y otra como artista.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <img
              src="https://tse4.mm.bing.net/th?id=OIG1.Away7q3NvmNFCzENU2HH&pid=ImgGn"
              className="d-dark-mode-none"
              style={{ width: "250px", height: "250px", borderRadius: "50%" }}
              alt="Clutch"
            />
          </div>
        </div>

        <div className="col-lg-6 mt-xl-3 pt-5 pt-lg-4">
          <div className="row row-cols-2 gx-3 gx-lg-4">
            <div className="col pt-lg-5 mt-lg-1">
              <img
                src="https://www.fundaciongoodjob.org/wp-content/uploads/2024/02/IMAGEN-APARTADO-LAS-PERSONAS-CON-DISCAPACIDAD-scaled-749x500.jpg"
                style={{ width: "310px", height: "300px" }}
                className="d-block rounded-3 mb-3 mb-lg-4"
                alt="Image"
              />
              <img
                src="https://okdiario.com/img/2019/08/28/crear-grupo-cerrado-en-facebook-655x368.jpg"
                style={{ width: "310px", height: "300px" }}
                className="d-block rounded-3"
                alt="Image"
              />
            </div>
            <div className="col">
              <img
                src="https://universidadeuropea.com/resources/media/images/contenido-multimedia-1200x630_aiMXXbr.original.jpg"
                style={{ width: "300px", height: "300px" }}
                className="d-block rounded-3 mb-3 mb-lg-4"
                alt="Image"
              />
              <img
                src="https://conviertemas.com/wp-content/uploads/2024/03/Miniatura-blog-CMAS-34.png"
                style={{ width: "310px", height: "300px" }}
                className="d-block rounded-3"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>

      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
  <div className="col">
    <div className="card card-hover border-0 bg-transparent">
      <div className="position-relative">
        <img
          src="https://ca.slack-edge.com/T0BFXMWMV-U07S8EZG1QV-ea5ed80027bd-512"
          className="rounded-3"
          style={{ width: "100%", height: "350px", objectFit: "cover" }}
          alt="Person 1"
        />
        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">
          <span className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25 rounded-3"></span>
        </div>
      </div>
      <div className="card-body text-center p-3">
        <h3 
          href="https://github.com/Cgeorge1807" 
          style={{
              color: "white",
              textDecoration: "none",
              transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.color = "#007BFF"} 
          onMouseOut={(e) => e.target.style.color = "white"}
          className="fs-lg fw-semibold pt-1 mb-2"
        >
          Christian George
        </h3>
      </div>
    </div>
  </div>

  <div className="col">
    <div className="card card-hover border-0 bg-transparent">
      <div className="position-relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          className="rounded-3"
          style={{ width: "100%", height: "350px", objectFit: "cover" }}
          alt="Person 2"
        />
        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">
          <span className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25 rounded-3"></span>
        </div>
      </div>
      <div className="card-body text-center p-3">
        <h3 
          href="https://github.com/martinSabatini" 
          style={{
              color: "white",
              textDecoration: "none",
              transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.color = "#007BFF"} 
          onMouseOut={(e) => e.target.style.color = "white"}
          className="fs-lg fw-semibold pt-1 mb-2"
        >
          Martin Sabatini
        </h3>
      </div>
    </div>
  </div>

  <div className="col">
    <div className="card card-hover border-0 bg-transparent">
      <div className="position-relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          className="rounded-3"
          style={{ width: "100%", height: "350px", objectFit: "cover" }}
          alt="Person 3"
        />
        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">
          <span className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25 rounded-3"></span>
        </div>
      </div>
      <div className="card-body text-center p-3">
        <h3 
          href="https://github.com/DwTMolecule" 
          style={{
              color: "white",
              textDecoration: "none",
              transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.color = "#007BFF"} 
          onMouseOut={(e) => e.target.style.color = "white"}
          className="fs-lg fw-semibold pt-1 mb-2"
        >
          Matias Sanhueza
        </h3>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default About;
