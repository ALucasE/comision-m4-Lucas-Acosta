import { NavLink } from "react-router-dom";

export const NavBarPublic = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-primary sticky-top" data-bs-theme="dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler my-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mx-sm-2">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/"
                >
                  Home
                  <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/login"
                >
                  Iniciar Sesión
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/register"
                >
                  Registrase
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

{
  /* <div className="nav justify-content-end" id="navbarColor01">
</div> */
}
