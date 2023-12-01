import { createContext, useContext, useState } from "react";
import { createComment, deleteComment, getCommentsByPostId } from "../api/peticionsComment";
// import { useAuth } from "./AuthContext";

export const PostContext = createContext();

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

export const PostProvider = ({ children }) => {
  const [currentPost, setCurrentPost] = useState(null);
  const [currentComments, setCurrentsComments] = useState([]);
  const autorizacion = localStorage.getItem("token");

  const setPostContext = (post) => {
    // Formatear la fecha antes de almacenarla en el estado
    const formattedPost = {
      ...post,
      createdAt: new Date(post.createdAt).toLocaleString(),
    };
    setCurrentPost(formattedPost);
  };
  //OBTENER COMENTARIOS ####################################################################################
  const obtenerComentariosPorIdPost = async (id) => {
    try {
      const res = await getCommentsByPostId(autorizacion, id);
      if (res.status === 204) {
        setCurrentsComments(null);
      } else {
        setCurrentsComments(res.data);
      }
    } catch (error) {
      setCurrentsComments(null);
    }
  };
  //CREAR COMENTARIO ####################################################################################
  const agregarUnComentario = async (data) => {
    try {
      await createComment(autorizacion, data);
    } catch (error) {
      console.log(error);
    }
  };
  //Eliminar COMENTARIO ####################################################################################
  const eliminarUnComentario = async (id) => {
    try {
      await deleteComment(autorizacion, id);
    } catch (error) {
      console.log(error);
    }
  };

  const setCommentContext = (comments) => {
    setCurrentsComments(comments);
  };

  return (
    <PostContext.Provider
      value={{
        currentComments,
        currentPost,
        setPostContext,
        setCommentContext,
        obtenerComentariosPorIdPost,
        agregarUnComentario,
        eliminarUnComentario,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
