import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { usePostContext } from "../context/PostContext";
import { getPostById } from "../api/peticionsPost";
import { CardViewPost } from "../components/CardViewPost";
// import { getCommentsByPostId } from "../api/peticionsComment";
import { TableComments } from "../components/TableComments";

const OnePostView = () => {
  const { jwt } = useAuth();
  const { id } = useParams();
  const { setPostContext, obtenerComentariosPorIdPost, agregarUnComentario } = usePostContext();
  const ref = useRef(null);
  const [comentario, setComentario] = useState([]);

  const obtenerPost = async () => {
    try {
      const res = await getPostById(jwt, id);
      setPostContext(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const refresh = () => {
    setComentario(obtenerComentariosPorIdPost(id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const description = formData.get("description");

    const nuevoComentario = {
      postId: id,
      description: description,
    };

    agregarUnComentario(nuevoComentario);
    ref.current.reset();
  };

  useEffect(() => {
    obtenerComentariosPorIdPost(id);
  }, [comentario]);
  useEffect(() => {
    obtenerPost();
  }, []);

  return (
    <>
      <div>
        <CardViewPost />
      </div>
      <div className="d-grid gap-2 mt-3">
        <form onSubmit={handleSubmit} ref={ref}>
          <div className="form-floating">
            <input type="text" name="description" className="form-control" id="description" placeholder="name@example.com" />
            <label htmlFor="description">Comentario</label>
            <button className="btn btn-lg btn-primary my-1" type="submit" onClick={refresh}>
              Hacer un comentario nuevo
            </button>
          </div>
        </form>
      </div>
      <div>
        <TableComments />
      </div>
    </>
  );
};
export default OnePostView;

//#################################################################################################

// import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useParams } from "react-router-dom";
// import { usePostContext } from "../context/PostContext";
// import { getPostById } from "../api/peticionsPost";
// import { CardViewPost } from "../components/CardViewPost";
// import { getCommentsByPostId } from "../api/peticionsComment";
// import { TableComments } from "../components/TableComments";

// const OnePostView = () => {
//   const { jwt } = useAuth();
//   const { id } = useParams();
//   const { setPostContext, setCommentContext } = usePostContext();

//   const obtenerPost = async () => {
//     try {
//       const res = await getPostById(jwt, id);
//       setPostContext(res.data);
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };

//   const obtenerComentarios = async () => {
//     try {
//       const resComment = await getCommentsByPostId(jwt, id);
//       setCommentContext(resComment.data);
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };
//   useEffect(() => {
//     obtenerPost();
//   }, []);
//   useEffect(() => {
//     obtenerComentarios();
//   }, [id]);
//   return (
//     <>
//       <div>
//         <CardViewPost />
//       </div>
//       <div className="d-grid gap-2 mt-3">
//         <button className="btn btn-lg btn-primary my-1" type="button">
//           Hacer un comentario nuevo
//         </button>
//       </div>
//       <div>
//         <TableComments />
//       </div>
//     </>
//   );
// };
// export default OnePostView;
