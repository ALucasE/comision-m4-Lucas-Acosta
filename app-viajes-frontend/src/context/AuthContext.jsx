import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

//CREA EL CONTEXTO ############################################################################
export const AuthContext = createContext();

//USE CONTEXT #################################################################################
//Este es el que se debe exportar para los hijos
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

//FUNCIONALIDADES DEL CONTEXT ##################################################################
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const [jwt, setJwt] = useState(undefined);

  //Setea el estado de auth y guarda los datos del inicio de sesión en el Local Storage
  const login = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ user, token });
    setJwt(token);
  };

  //Setea el estado de auth y borra los datos del Local Storage
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null);
    setJwt(null);
  };

  //Setea el estado de auth y toma los datos del inicio de sesión que fueron almacenados en el Local Storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    //Si falta user o token se eliminan ambos
    if (!user || !token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuth(null);
      setJwt(null);
      return;
    } else {
      setAuth({ user, token });
      setJwt(token);
      //axios.defaults.headers.common["Authorization"] = `${localStorage.getItem("token")}`; // Configura Axios con el token al cargar la página
      //console.log("Axios: ", axios.defaults.headers.common["Authorization"]);
    }
  }, []);

  return <AuthContext.Provider value={{ jwt, auth, login, logout }}>{children}</AuthContext.Provider>;
};
