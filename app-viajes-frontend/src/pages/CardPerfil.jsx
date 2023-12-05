import { Link } from "react-router-dom";
export const CardPerfil = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="card my-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={user.avatar} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {/* <h5 className="card-title">Card title</h5> */}
              <p className="card-text">Correo electronico: {user.email}</p>
              <p className="card-text">Mis publicaciones:</p>
              <p className="card-text">
                <Link to="/post" className="btn btn-primary btn-sm">
                  Ver mis publicaciones
                </Link>
              </p>
              {/* <p className="card-text">
                <Link className="btn btn-primary btn-sm">Crear una publicación</Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
