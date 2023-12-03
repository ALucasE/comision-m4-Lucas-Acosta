import { useRef, useState } from "react";
import { CardBody } from "./Card";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/peticionsPost";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const validateForm = (post) => {
  let errors = {};

  // Validación para el campo 'title'
  if (!post.title.trim()) {
    errors.title = "El campo 'Titulo' es requerido";
  }

  // Validación para el campo 'imageURL'
  if (!post.imageURL.trim()) {
    errors.imageURL = "El campo 'URL de una imagen' es requerido";
  }

  // Validación para el campo 'description'
  if (!post.description.trim()) {
    errors.description = "El campo 'Comentario' es requerido";
  }

  return errors;
};
let styles = {
  fontWeight: "bold",
  color: "orange",
};

export const FormNewPost = () => {
  const ref = useRef(null);
  const [errors, setErrors] = useState({});

  const { jwt } = useAuth();
  const navigate = useNavigate();
  const volver = () => {
    navigate("/");
  };
  //Toma los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //toma los datos del evento directamente
    const formData = new FormData(e.target);
    const title = formData.get("title"); //Toma el dato del input name="title"
    const imageURL = formData.get("imageURL");
    const description = formData.get("description");

    const post = {
      title,
      imageURL,
      description,
    };
    //Validación de Errores
    const formErrors = validateForm(post);
    setErrors(formErrors);
    //Envió de los datos al BackEnd con validación del formulario
    if (Object.keys(formErrors).length === 0) {
      try {
        const res = await createPost(jwt, post);
        if (res.status !== 201) {
          console.log("NO 200: ", res.data);
          ref.current.reset();
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tu publicación ha sido guardada.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/post");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error",
          text: "El servidor rechazo la solicitud",
        });
        console.log("Error: ", error);
      }

      //Limpia el formulario
      ref.current.reset();
    }
  };
  return (
    <CardBody>
      <form onSubmit={handleSubmit} ref={ref}>
        <fieldset>
          {/* <legend>Login</legend> */}

          <div className="form-group">
            <label className="form-label mt-4" htmlFor="title">
              Titulo
            </label>
            <input type="text" className="form-control" placeholder="Mi titulo" id="title" name="title" />
            {errors.title && <p style={styles}>{errors.title}</p>}
          </div>

          <div className="form-group">
            <label className="form-label mt-4" htmlFor="imageURL">
              URL de una imagen
            </label>
            <input type="url" className="form-control" placeholder="http://www.mi-imagen.com" id="imageURL" name="imageURL" />
            {errors.imageURL && <p style={styles}>{errors.imageURL}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label mt-4">
              Comentario
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              rows={4}
              spellCheck="false"
              data-ms-editor="true"
              defaultValue={""}
            />
            {errors.description && <p style={styles}>{errors.description}</p>}
          </div>

          <div className="d-grid gap-3 my-2">
            <button className="btn btn-primary mt-2" type="submit">
              Enviar
            </button>
            <button className="btn btn-secondary" type="button" onClick={volver}>
              Volver
            </button>
          </div>
        </fieldset>
      </form>
    </CardBody>
  );
};
