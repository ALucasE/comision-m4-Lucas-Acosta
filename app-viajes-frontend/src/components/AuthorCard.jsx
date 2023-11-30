import { usePostContext } from "../context/PostContext";

export const AuthorCard = () => {
  const { currentPost } = usePostContext();
  return (
    <div className="card p-1 border-0">
      <div className="d-flex align-items-center">
        <div className="image">
          <img src={currentPost?.author?.avatar} className="rounded" width={50} />
        </div>
        <div className="ml-3 w-100">
          <h4 className="mx-0 my-0">{currentPost?.author?.username}</h4>
          <span>E-Mail: {currentPost?.author?.email}</span>
        </div>
      </div>
    </div>
  );
};
