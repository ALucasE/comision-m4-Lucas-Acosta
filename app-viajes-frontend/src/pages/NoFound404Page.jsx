import { Link } from "react-router-dom";

const NoFound404Page = () => {
  return (
    <div className="m-0 vh-100 row justify-content-center align-items-center">
      <div className="col-auto text-center">
        <div className="alert alert-dismissible alert-warning">
          <h4 className="alert-heading">¡Oops! Parece que te has perdido en el ciberespacio.</h4>
          <p className="mb-0">
            Parece que te aventuraste a un rincón inexplorado de nuestro sitio. No te preocupes, incluso los astronautas digitales se pierden a veces.
          </p>
          <p>Para volver al punto de partida, simplemente haz clic en el botón de inicio a continuación.</p>
          <Link to={"/"}>
            <button type="button" className="btn btn-secondary">
              Ir al inicio!
            </button>
          </Link>
          <p className="mt-3">Si necesitas ayuda o tienes alguna pregunta, estamos aquí para guiarte. ¡Feliz navegación! 🚀</p>
        </div>
      </div>
    </div>
  );
};
export default NoFound404Page;
