import { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { Mensaje } from "./Mensaje";
import { CardBody } from "./Card";

const validateForm = (comentario) => {
  let errors = {};

  if (!comentario.description.trim()) {
    errors.description = "El campo 'Comentario' es requerido";
  }

  return errors;
};

export const AgregarEditarComentario = ({ postId, setComentarios, comentarios, refresh, comentarioEditar }) => {
  const ref = useRef(null);
  const [error, setError] = useState(null);
  const [errorsValidate, setErrorsValidate] = useState({});

  const isEditing = !!comentarioEditar;

  // Si estamos en modo de edición, establecer el valor del campo description
  useEffect(() => {
    if (isEditing) {
      ref.current.description.value = comentarioEditar.description;
    }
  }, [comentarioEditar, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get("description");
    const nuevoComentario = {
      postId: postId,
      description: description,
    };

    const formErrors = validateForm(nuevoComentario);
    setErrorsValidate(formErrors);

    if (Object.keys(formErrors).length === 0) {
      let options = {
        body: nuevoComentario,
        headers: { "content-type": "application/json" },
      };

      const requestUrl = isEditing ? `${API_URL}comments/${comentarioEditar._id}` : `${API_URL}comments/`;

      const requestMethod = isEditing ? "put" : "post";

      helpPeticionesHttp()
        [requestMethod](requestUrl, options)
        .then((res) => {
          if (!res.err) {
            setComentarios(res);
          } else {
            setError(res);
            Swal.fire({
              icon: "error",
              title: "Ocurrió un error",
              text: "El servidor rechazó la solicitud",
            });
          }
        });

      setComentarios([...comentarios]);
      ref.current.reset();
    }
  };

  return (
    <CardBody>
      <div className="d-grid gap-2 mt-0">
        <form onSubmit={handleSubmit} ref={ref}>
          <div className="form-floating">
            <input type="text" name="description" className="form-control" id="description" placeholder="" />
            <label htmlFor="description">Comentario</label>
            {errorsValidate.description && <p style={styles}>{errorsValidate.description}</p>}
            <button className="btn btn-sm btn-primary my-2" type="submit" onClick={refresh}>
              {isEditing ? "Actualizar comentario" : "Enviar comentario"}
            </button>
            {error && <Mensaje mensaje={error.status} bqColor="rojo" />}
          </div>
        </form>
      </div>
    </CardBody>
  );
};

const styles = {
  fontWeight: "bold",
  color: "orange",
};
