import { useRef } from "react";
import { CardBody } from "./Card";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { useState } from "react";
import { Mensaje } from "./Mensaje";
//API_URL = "http://localhost:3000/api/";

export const AgregarComentario = ({ postId, setComentarios, comentarios }) => {
  const ref = useRef(null);
  const [error, setError] = useState(null);
  //maneja el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get("description");
    const nuevoComentario = {
      postId: postId,
      description: description,
    };
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
        }
      });
    setComentarios([...comentarios]);
    ref.current.reset();
  };
  return (
    <CardBody>
      <div className="d-grid gap-2 mt-0">
        <form onSubmit={handleSubmit} ref={ref}>
          <div className="form-floating">
            <input type="text" name="description" className="form-control" id="description" placeholder="" />
            <label htmlFor="description">Comentario</label>
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
