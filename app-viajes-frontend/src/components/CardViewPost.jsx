import { useEffect, useState } from "react";
import { getPostById } from "../api/peticionsPost";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { CardBody } from "./Card";

export const CardViewPost = () => {
  const [post, setPost] = useState({});
  const { jwt } = useAuth();
  const { id } = useParams();

  // Formatear la fecha
  const formattedDate = new Date(post.createdAt).toLocaleString();

  const obtenerPost = async () => {
    try {
      const res = await getPostById(jwt, id);

      setPost(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    obtenerPost();
  }, []);

  return (
    <>
      <CardBody>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={post?.imageURL} className="img-fluid rounded-start" alt="Imagen del post" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{post?.title}</h5>
                <p className="card-text">{post?.description}</p>
                <p className="card-text">Autor: {post?.author?.username}</p>
                <p className="card-text">
                  <small className="text-body-secondary">{formattedDate}</small>
                </p>
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-lg btn-primary my-1" type="button">
                Hacer un comentario
              </button>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  );
};

// style={{ maxWidth: 540 }}
