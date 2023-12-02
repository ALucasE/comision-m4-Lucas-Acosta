import { useEffect, useState } from "react";
import { getPostByAuthor } from "../api/peticionsPost";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SinPost } from "./SinPost";

export const CardViewPostsPrivate = () => {
  const [posts, setPosts] = useState([]);
  const [showBotonVer, setShowBotonVer] = useState(true);
  const { jwt, auth } = useAuth();
  const navigate = useNavigate();

  const obtenerPostByAuthor = async () => {
    try {
      const res = await getPostByAuthor(jwt);
      if (res.status !== 200) return <SinPost />;
      if (res.status === 204) return <SinPost />;
      setPosts(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    obtenerPostByAuthor();
  }, []);

  //########### validacion boton VER ############
  const ver = (id) => {
    navigate(`/post/${id}`);
  };
  useEffect(() => {
    if (auth !== null && auth !== undefined) {
      setShowBotonVer(false);
    }
  }, [auth, navigate]);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((item, key) => {
          // Formatear la fecha
          const formattedDate = new Date(item.createdAt).toLocaleString();

          return (
            <div key={key} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.imageURL} className="img-fluid rounded-start" alt="Imagen del post" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                    <p className="card-text">{item?.description}</p>
                    <p className="card-text">Autor: {item?.author?.username}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">{formattedDate}</small>
                    </p>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-lg btn-primary my-1" type="button" hidden={showBotonVer} onClick={() => ver(item._id)}>
                    Ver publicación
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <SinPost />
      )}
    </>
  );
};
