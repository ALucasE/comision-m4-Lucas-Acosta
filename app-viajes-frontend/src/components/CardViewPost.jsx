import { CardBody } from "./Card";
import { AuthorCard } from "./AuthorCard";
import { usePostContext } from "../context/PostContext";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { Link } from "react-router-dom";

export const CardViewPost = ({ elimiarPost }) => {
  const { currentPost } = usePostContext();
  // const autorId = currentPost?.author?._id;
  const { id } = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <CardBody>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={currentPost?.imageURL} className="img-fluid rounded-start" alt="Imagen del post" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{currentPost?.title}</h5>
                <p className="card-text">{currentPost?.description}</p>
                <div className="card-text">
                  <AuthorCard />
                </div>
                <p className="card-text">
                  <small className="text-body-secondary">{currentPost?.createdAt}</small>
                </p>
              </div>
              <div className="btn-group" hidden={currentPost?.author?._id === id ? false : true}>
                <Link to={`/post/edit/${currentPost._id}`} type="button" className="btn btn-primary btn-sm">
                  <BsPencil />
                </Link>
                <button type="button" className="btn btn-primary btn-sm" onClick={elimiarPost}>
                  <BsTrash3 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  );
};

// style={{ maxWidth: 540 }}
// autorId === id ? true : false
