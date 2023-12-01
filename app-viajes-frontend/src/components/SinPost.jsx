import { useAuth } from "../context/AuthContext";
import { CardBody, CardHeader, CardText } from "./Card";
import { Link } from "react-router-dom";

export const SinPost = () => {
  const { auth } = useAuth;
  if (auth === null || auth === undefined) {
    return (
      <>
        <CardHeader>Vaya! parece que aun no hay publicaciones!</CardHeader>
        <CardBody>
          <h4 className="card-title">Puedes ser el primero en crear una publicación</h4>
          <CardText>Regístrate o inicia sesión para crear publicaciones</CardText>
          <Link to={"/login"} className="btn btn-primary">
            Iniciar Sesión
          </Link>
          <Link to={"/register"} className="btn btn-success ms-1">
            Registrarse
          </Link>
        </CardBody>
      </>
    );
  } else {
    return (
      <>
        <CardHeader>Vaya! parece que aun no hay publicaciones!</CardHeader>
        <CardBody>
          <h4 className="card-title">Puedes ser el primero en crear una publicación</h4>
          <Link to={"/post/new"} className="btn btn-success">
            Crear publicación
          </Link>
        </CardBody>
      </>
    );
  }
};
