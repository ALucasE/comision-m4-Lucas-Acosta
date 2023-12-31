import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Mensaje } from "../components/Mensaje";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { CardPublicaciones } from "../components/CardPublicaciones";
import { ListaDeComentarios } from "../components/ListaDeComentarios";
import { AgregarComentario } from "../components/AgregarComentario";
//API_URL = "http://localhost:3000/api/";

const VerPostPage = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comentarios, setComentarios] = useState(null);
  const [loadingComentario, setLoadingComentarios] = useState(false);
  const [errorComentarios, setErrorComentarios] = useState(null);
  const go = useNavigate();

  //ELIMNAR UNA PUBLICACION
  const eliminarPublicacion = (id) => {
    let options = {
      headers: { "content-type": "application/json" },
    };

    helpPeticionesHttp()
      .del(`${API_URL}post/${id}`, options)
      .then((res) => {
        console.log(res);
        if (!res.err) {
          // let newData = comentarios.filter((comment) => comment.id !== id);
          // setComentarios(newData);
          go("/post");
        } else {
          setError(res);
        }
      });
  };

  //ELIMANIAR UN COMENTARIO
  const eliminarComentario = (id) => {
    let options = {
      headers: { "content-type": "application/json" },
    };

    helpPeticionesHttp()
      .del(`${API_URL}comments/${id}`, options)
      .then((res) => {
        if (!res.err) {
          let newData = comentarios.filter((comment) => comment._id !== id);
          setComentarios(newData);
        } else {
          setError(res);
        }
      });
  };

  //EFECTO PARA CARGAR POST
  useEffect(() => {
    setLoading(true);
    helpPeticionesHttp()
      .get(`${API_URL}post/getPostId/${id}`)
      .then((res) => {
        if (!res.err) {
          // Formatear la fecha antes de almacenarla en el estado
          const formattedPost = {
            ...res,
            createdAt: new Date(res.createdAt).toLocaleString(),
          };
          setPublicacion(formattedPost);
          setError(null);
        } else {
          setPublicacion(null);
          setError(res);
        }
        setLoading(false);
      });
  }, []);

  //EFECTO PARA CARGAR COMENTARIOS
  const getComments = () => {
    setLoadingComentarios(true);
    helpPeticionesHttp()
      .getResJson(`${API_URL}comments/${id}`)
      .then((res) => {
        if (!res.err) {
          setComentarios(res);
          setErrorComentarios(null);
        } else {
          if (res.status === 204) {
            setLoadingComentarios(false);
          } else {
            console.log("else", res);
            setComentarios(null);
            setErrorComentarios(res);
          }
        }
        setLoadingComentarios(false);
      });
  };
  //EFECTO PARA CARGAR COMENTARIOS
  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <Mensaje mensaje={error.status} bqColor="rojo" />}
      {publicacion && <CardPublicaciones publicacion={publicacion} eliminarPublicacion={eliminarPublicacion} />}
      {loadingComentario && <Loader />}
      {errorComentarios && <Mensaje mensaje={errorComentarios.status} bqColor="rojo" />}
      {comentarios && <ListaDeComentarios comentarios={comentarios} eliminarComentario={eliminarComentario} refresh={getComments} />}
      <AgregarComentario postId={id} setComentarios={setComentarios} comentarios={comentarios} refresh={getComments} />
    </>
  );
};
export default VerPostPage;

// {sinContenido && <SinComments />}
