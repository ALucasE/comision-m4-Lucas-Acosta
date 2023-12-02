import { Link } from "react-router-dom";
import { CardBody, CardHeader } from "./Card";

export const CardSinPostPrivate = () => {
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
};
