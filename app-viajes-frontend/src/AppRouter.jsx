//RUTAS / CONTEXT / PROVIDER
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { PostProvider } from "./context/PostContext";

//IMPORT PAGINAS
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NoFound404Page from "./pages/NoFound404Page";
import HomePrivate from "./pages/HomePrivate";
import PostPrivate from "./pages/PostPrivate";
import PostCreate from "./pages/PostCreate";
import ProfilePage from "./pages/ProfilePage";
// import OnePostView from "./pages/OnePostView";
// import EditPostPage from "./pages/EditPostPage";
import EditarPublucacionesPage from "./pages/EditarPublucacionesPage";
import { Pruebas } from "./pages/Pruebas";
import VerPostPage from "./pages/VerPostPage";

function AppRouter() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/pruebas" element={<Pruebas />} />

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<HomePrivate />} />
              <Route path="/post" element={<PostPrivate />} />
              <Route path="/post/new" element={<PostCreate />} />
              <Route path="/post/edit/:id" element={<EditarPublucacionesPage />} />
              <Route path="/post/:id" element={<VerPostPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* <Route path="/post/edit/:id" element={<EditPostPage />} /> */}
              {/* <Route path="/post/:id" element={<OnePostView />} /> */}
            </Route>

            <Route path="*" element={<NoFound404Page />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}
export default AppRouter;
