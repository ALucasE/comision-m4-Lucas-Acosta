import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./routes/PrivateRoutes";
//IMPORT PAGINAS
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NoFound404Page from "./pages/NoFound404Page";
import HomePrivate from "./pages/HomePrivate";
import PostPrivate from "./pages/PostPrivate";
import OnePostView from "./pages/OnePostView";
import { PublicRoutes } from "./routes/PublicRoutes";
import { Pruebas } from "./pages/Pruebas";
import PostCreate from "./pages/PostCreate";
import { PostProvider } from "./context/PostContext";

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
              <Route path="/post/:id" element={<OnePostView />} />
            </Route>

            <Route path="*" element={<NoFound404Page />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}
export default AppRouter;
