import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import { API_URL } from "../api/constantes";
import { Loader } from "../components/Loader";
import { Mensaje } from "../components/Mensaje";
import { FormEditPost } from "../components/FormEditPost";

const EditarPublucacionesPage = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    helpPeticionesHttp()
      .get(`${API_URL}post/getPostId/${id}`)
      .then((res) => {
        if (!res.err) {
          setPublicacion(res);

          setError(null);
        } else {
          setPublicacion(null);

          setError(res);
        }
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <Mensaje mensaje={error.status} bqColor="rojo" />}
      {publicacion && <FormEditPost publicacion={publicacion} />}
    </>
  );
};
export default EditarPublucacionesPage;
