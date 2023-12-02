import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Mensaje } from "../components/Mensaje";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { CardPublicaciones } from "../components/CardPublicaciones";
import { SinComments } from "../components/SinComments";
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
  const [sinContenido, setSinContenido] = useState(false);

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
  useEffect(() => {
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
            setSinContenido(true);
          } else {
            console.log("else", res);
            setComentarios(null);
            setErrorComentarios(res);
          }
        }
        setLoadingComentarios(false);
      });
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <Mensaje mensaje={error.status} bqColor="rojo" />}
      {publicacion && <CardPublicaciones publicacion={publicacion} />}
      {loadingComentario && <Loader />}
      {errorComentarios && <Mensaje mensaje={errorComentarios.status} bqColor="rojo" />}
      {sinContenido && <SinComments />}
      {comentarios && <ListaDeComentarios comentarios={comentarios} />}
      <AgregarComentario postId={id} setComentarios={setComentarios} comentarios={comentarios} />
    </>
  );
};
export default VerPostPage;
