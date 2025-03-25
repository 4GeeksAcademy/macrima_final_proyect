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
import Formulario from "./component/AgregarTag";
import FormularioEdit from "./component/EditarTag";
import { TagsPage } from "./pages/viewtags";
import ArtistaForm from "./component/artistaForm";
import ArtistaGet from "./component/artistaGet";
import ArtistaUpdate from "./pages/Artistas";
import ArtistaDelete from "./component/artistaDelete";
import FormUpdate from "./component/formUpdate";
import ArtisListView from "./component/artistListView";
import AddFanForm from "./pages/addFan";
import UpdateFanForm from "./pages/updateFan";
import DetailFan from "./pages/detailFan";
import FanListView from "./pages/fanlistView";
import Artistas from "./pages/Artistas";
import AgregarTag from "./component/AgregarTag";
import EditarTag from "./component/EditarTag";
import ViewFollower from "./pages/followerView";
import Followers from "./pages/followers";
import AddWallPaperForm from "./pages/addWalpaper";
import WallPaperView from "./pages/wallpaperlistView";
import UpdateWallPaper from "./pages/updateWallpaper";
import DetailWallPaper from "./pages/detailWallPaper";
import TagsWallpaperListView from "./pages/tagWallpaperListview";
import CreatetagWallpaper from "./component/createWallpaperTag";
import UpdateTagsWallpaper from "./component/updateTagsWallpaper";
import FavoritosListView from "./pages/favoritosListView";
import NewFavorito from "./pages/newFavorito";
import UpdateFavoritos from "./pages/updateFavorito";
import MeGustaList from "./component/megustaList";
import NewMeGusta from "./pages/newMeGusta";
import UpdateMeGusta from "./pages/updateMegusta";

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
                        <Route element={<AgregarTag />} path="/tags/new" />
                        <Route element={<TagsPage />} path="/tags" />
                        <Route element={<EditarTag />} path="/tags/edit/:id" />
                        <Route element={<ArtistaForm/>} path="/ArtistaForm" />
                        <Route element={<ArtistaGet />} path="/artistasGet"/>
                        <Route element={<FormUpdate />} path="/artista/:id"/>
                        <Route element={<Artistas />} path="/artistas"/>
                        <Route element={<ArtisListView />} path="/artistaList"/>
                        <Route element={<ArtistaDelete/>} path="/artistasDelete"/>
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<AddFanForm />} path="/addFan" />
                        <Route element={<UpdateFanForm/>} path="/updateFan/:fanId" />
                        <Route element={<DetailFan/>} path="/detailFan/:fanId" />
                        <Route element={<FanListView/>} path="/FanListView" />
                        <Route element={<ViewFollower/>} path="/followerView" />
                        <Route element={<Followers/>} path="/follower/new" />
                        <Route element={<WallPaperView/>} path="/wallpapers" />
                        <Route element={<AddWallPaperForm/>} path="/wallpaper/new" />
                        <Route element={<UpdateWallPaper/>} path="/wallpaper/edit/:paperId" />
                        <Route element={<DetailWallPaper/>} path="/wallpaper/detail/:paperId" />
                        <Route element={<TagsWallpaperListView/>} path="/TagsWallpaper" />
                        <Route element={<CreatetagWallpaper/>} path="/wallpapertag" />
                        <Route element={<UpdateTagsWallpaper/>} path="/tags_wallpaper/:id" />
                        <Route element={<FavoritosListView/>} path="/favoritos" />
                        <Route element={<NewFavorito/>} path="/favorito/new" />
                        <Route element={<UpdateFavoritos/>} path="/favoritos/edit/:id"/>
                        <Route element={<MeGustaList/>} path="/me-gusta"/>
                        <Route element={<NewMeGusta/>} path="/me_gusta/new"/>
                        <Route element={<UpdateMeGusta/>} path="/me_gusta/edit/:id"/>
                        
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);