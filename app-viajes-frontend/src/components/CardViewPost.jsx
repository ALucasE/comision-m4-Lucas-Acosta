import { CardBody } from "./Card";
import { AuthorCard } from "./AuthorCard";
import { usePostContext } from "../context/PostContext";

export const CardViewPost = () => {
  const { currentPost } = usePostContext();

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
                <p className="card-text">
                  <AuthorCard />
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">{currentPost?.createdAt}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  );
};

// style={{ maxWidth: 540 }}
