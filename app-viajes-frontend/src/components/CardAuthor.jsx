export const CardAuthor = ({ autor }) => {
  return (
    <div className="card p-1 border-">
      <div className="d-flex align-items-center">
        <div className="image">
          <img src={autor.avatar} className="rounded" width={50} />
        </div>
        <div className="ms-2 ml-3 w-100">
          <h4 className="mx-0 my-0">{autor.username}</h4>
          <span>{autor.email}</span>
        </div>
      </div>
    </div>
  );
};
