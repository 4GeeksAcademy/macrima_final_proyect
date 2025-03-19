import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import ArtistaForm from "./component/artistaForm";
import ArtistaGet from "./component/artistaGet";
import ArtistaUpdate from "./component/artistaUpdate";
import ArtistaDelete from "./component/artistaDelete";
import FormUpdate from "./component/formUpdate";
import ArtisListView from "./component/artistListView";
import AddFanForm from "./pages/addFan";
import UpdateFanForm from "./pages/updateFan";
import DetailFan from "./pages/detailFan";
import FanListView from "./pages/fanlistView";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<ArtistaForm/>} path="/ArtistaForm" />
                        <Route element={<ArtistaGet />} path="/artistasGet"/>
                        <Route element={<ArtistaUpdate />} path="/artistaUpdate/artistas_id"/>
                        <Route element={<FormUpdate />} path="/updateArtista/:artistasId"/>
                        <Route element={<FormUpdate />} path="/updateArtista"/>
                        <Route element={<ArtisListView />} path="/artistaList"/>
                        <Route element={<ArtistaDelete/>} path="/artistasDelete"/>
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<AddFanForm />} path="/addFan" />
                        <Route element={<UpdateFanForm/>} path="/updateFan/:fanId" />
                        <Route element={<DetailFan/>} path="/detailFan/:fanId" />
                        <Route element={<FanListView/>} path="/FanListView" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);