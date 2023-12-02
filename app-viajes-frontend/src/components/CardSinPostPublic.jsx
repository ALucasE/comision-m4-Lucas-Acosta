import { Link } from "react-router-dom";
import { CardBody, CardHeader, CardText } from "./Card";

export const CardSinPostPublic = () => {
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
};
