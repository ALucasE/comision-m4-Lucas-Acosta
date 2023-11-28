import { useEffect, useRef, useState } from "react";
import { reqLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  //const { axiosError, setAxiosError } = useState(false);
  const ref = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  //Toma los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //toma los datos del evento directamente
    const formData = new FormData(e.target);
    const username = formData.get("username"); //Toma el dato del input name="username"
    const password = formData.get("password");

    const user = {
      username,
      password,
    };
    //Envio de los datos al BackEnd
    try {
      const res = await reqLogin(user);
      if (res.status !== 200) {
        console.log("NO 200: ", res.data);
        ref.current.reset();
      }
      login(res.data);
      navigate("/home");
    } catch (error) {
      alert("Ocurrio un error ", error.response.data.message);
      console.log("Error: ", error);
    }

    //Limpia el formulario
    ref.current.reset();
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <fieldset>
        {/* <legend>Login</legend> */}

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="username">
            Nombre de usuario
          </label>
          <input type="text" className="form-control" placeholder="juanperez" id="username" name="username" />
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="password">
            Contraseña
          </label>
          <input type="password" className="form-control" placeholder="**********" id="password" name="password" />
        </div>
        {/* {axiosError && (
          <div className="alert alert-danger mt-2" role="alert">
            {axiosError}
          </div>
        )} */}
        <div className="form-group">
          <button type="submit" className="btn btn-primary mt-5">
            Iniciar sesión
          </button>
        </div>
      </fieldset>
    </form>
  );
};
export default FormLogin;
