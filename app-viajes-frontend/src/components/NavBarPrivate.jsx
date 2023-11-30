import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCard } from "./UserCard";
export const NavBarPrivate = () => {
  const { logout } = useAuth();

  // const navigate = useNavigate();
  // const cerrarSesion = () => {
  //   logout();
  //   navigate("/");
  // };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary sticky-top" data-bs-theme="dark">
        <div className="container-fluid">
          <UserCard />
          {/* <Link className="navbar-brand" to="/">
            Navbar
          </Link> */}
          <button
            className="navbar-toggler my-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse ms-3" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/post"
                >
                  Publicaciones
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/profile"
                >
                  Perfil
                </NavLink>
              </li> */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                  Acciones
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/post/new">
                    Crear publicación
                  </Link>
                  <Link className="dropdown-item" to="/post">
                    Ver mis publicación
                  </Link>
                  <Link className="dropdown-item" to="/">
                    Something else here
                  </Link>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to="/profile">
                    Perfil
                  </Link>
                </div>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-secondary my-2 my-sm-2" type="button" onClick={logout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
