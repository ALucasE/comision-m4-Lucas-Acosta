// import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import de paginas
import PublicHomePage from "./pages/PublicHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <AuthProvider>
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
              <Route path="/post/edit/:id" element={<EditPostPage />} />
              <Route path="/post/:id" element={<OnePostView />} />
              <Route path="/post/:id" element={<VerPostPage />} />
            </Route>

            <Route path="*" element={<NoFound404Page />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider> */
}
