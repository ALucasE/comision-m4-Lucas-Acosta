import { useRef } from "react";
import { CardBody } from "./Card";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/peticionsPost";
import { useAuth } from "../context/AuthContext";

export const FormNewPost = () => {
  const ref = useRef(null);

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

    //Envio de los datos al BackEnd
    try {
      const res = await createPost(jwt, post);
      if (res.status !== 201) {
        console.log("NO 200: ", res.data);
        ref.current.reset();
      }
      navigate("/home");
    } catch (error) {
      alert("Ocurrio un error ", error.response.data.message);
      console.log("Error: ", error);
    }

    //Limpia el formulario
    ref.current.reset();
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
          </div>

          <div className="form-group">
            <label className="form-label mt-4" htmlFor="imageURL">
              URL de una imagen
            </label>
            <input type="urlS" className="form-control" placeholder="http://www.mi-imagen.com" id="imageURL" name="imageURL" />
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
