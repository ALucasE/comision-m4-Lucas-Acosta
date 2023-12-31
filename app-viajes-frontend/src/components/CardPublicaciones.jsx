import { Link } from "react-router-dom";
import { CardAuthor } from "./CardAuthor";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";

export const CardPublicaciones = ({ publicacion, eliminarPublicacion }) => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="card-body">
      <div className="card mb-0">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={publicacion.imageURL} className="img-fluid rounded-start" alt="Imagen del post" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{publicacion.title}</h5>
              <p className="card-text">{publicacion.description}</p>
              <CardAuthor autor={publicacion.author} />
              <p className="card-text">
                <small className="text-body-secondary">Fecha de creacion: {publicacion.createdAt}</small>
              </p>
            </div>
            <div className="btn-group" hidden={publicacion?.author?._id === id ? false : true}>
              <Link to={`/post/edit/${publicacion._id}`} type="button" className="btn btn-primary btn-sm">
                <BsPencil />
              </Link>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  Swal.fire({
                    title: "Estas seguro/a?",
                    text: "¡No podrás revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Sí, bórralo!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      eliminarPublicacion(publicacion._id);
                      Swal.fire({
                        title: "¡Eliminado!",
                        text: "Elemento eliminado.",
                        icon: "success",
                      });
                    }
                  });
                }}
              >
                <BsTrash3 />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//publicacion?.author?._id === id ? false : true
