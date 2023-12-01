import { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardBody } from "./Card";
import { useState } from "react";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { Mensaje } from "./Mensaje";

export const FormEditPost = ({ publicacion }) => {
  const { title, imageURL, description } = publicacion;
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title, imageURL, description });
  const ref = useRef(null);
  const go = useNavigate();
  //Toma los datos del formulario
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Envio de los datos al BackEnd
    console.log(formData);
    let options = {
      body: formData,
      headers: { "content-type": "application/json" },
    };

    helpPeticionesHttp()
      .put(`${API_URL}post/${id}`, options)
      .then((res) => {
        if (!res.err) {
          go("/post");
        } else {
          console.log(res);
          setError(res);
        }
      });

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
            <input
              type="text"
              className="form-control"
              value={formData.title}
              id="title"
              name="title"
              onChange={handleInputChange}
              // defaultValue={publicacion.title}
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-4" htmlFor="imageURL">
              URL de una imagen
            </label>
            <input
              type="url"
              className="form-control"
              value={formData.imageURL}
              id="imageURL"
              name="imageURL"
              onChange={handleInputChange}
              // defaultValue={publicacion.imageURL}
            />
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
              value={formData.description}
              onChange={handleInputChange}
              // defaultValue={publicacion.description}
            />
          </div>

          <div className="d-grid gap-3 my-2">
            <button className="btn btn-primary mt-2" type="submit">
              Enviar
            </button>
            <Link to={`/post/${publicacion._id}`} className="btn btn-secondary" type="button">
              Volver
            </Link>
          </div>
        </fieldset>
      </form>
      {error && <Mensaje mensaje={`${error.status} - ${error.statusText}`} bgColor="rojo" />}
    </CardBody>
  );
};
