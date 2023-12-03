import { useRef } from "react";
import { CardBody } from "./Card";
import Swal from "sweetalert2";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { useState } from "react";
import { Mensaje } from "./Mensaje";
//API_URL = "http://localhost:3000/api/";

const validateForm = (comentario) => {
  let errors = {};

  // Validación para el campo 'description'
  if (!comentario.description.trim()) {
    errors.description = "El campo 'Comentario' es requerido";
  }

  return errors;
};
let styles = {
  fontWeight: "bold",
  color: "orange",
};

export const AgregarComentario = ({ postId, setComentarios, comentarios }) => {
  const ref = useRef(null);
  const [error, setError] = useState(null);
  const [errorsValidate, setErrorsValidate] = useState({});
  //maneja el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get("description");
    const nuevoComentario = {
      postId: postId,
      description: description,
    };
    //Validación de Errores
    const formErrors = validateForm(nuevoComentario);
    setErrorsValidate(formErrors);
    if (Object.keys(formErrors).length === 0) {
      let options = {
        body: nuevoComentario,
        headers: { "content-type": "application/json" },
      };
      helpPeticionesHttp()
        .post(`${API_URL}comments/`, options)
        .then((res) => {
          if (!res.err) {
            setComentarios([...comentarios, res]);
          } else {
            setError(res);
            Swal.fire({
              icon: "error",
              title: "Ocurrió un error",
              text: "El servidor rechazo la solicitud",
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
            <button className="btn btn-sm btn-primary my-2" type="submit">
              Enviar comentario
            </button>
            {error && <Mensaje mensaje={error.status} bqColor="rojo" />}
          </div>
        </form>
      </div>
    </CardBody>
  );
};
