import { useRef } from "react";
import { CardBody } from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostContext";
import { updatePost } from "../api/peticionsPost";

const EditPostPage = () => {
  const { currentPost } = usePostContext();
  const ref = useRef(null);
  let jwt = localStorage.getItem("token");
  const go = useNavigate();

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
      const res = await updatePost(jwt, post);
      if (res.status !== 202) {
        console.log("NO 202: ", res.data);
        ref.current.reset();
      }
      go("/post");
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
            <input type="text" className="form-control" value={currentPost?.title} id="title" name="title" />
          </div>

          <div className="form-group">
            <label className="form-label mt-4" htmlFor="imageURL">
              URL de una imagen
            </label>
            <input type="url" className="form-control" value={currentPost?.imageURL} id="imageURL" name="imageURL" />
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
              value={currentPost?.description}
              defaultValue={""}
            />
          </div>

          <div className="d-grid gap-3 my-2">
            <button className="btn btn-primary mt-2" type="submit">
              Enviar
            </button>
            <Link to={`/post/${currentPost?._id}`} className="btn btn-secondary" type="button">
              Volver
            </Link>
          </div>
        </fieldset>
      </form>
    </CardBody>
  );
};
export default EditPostPage;
