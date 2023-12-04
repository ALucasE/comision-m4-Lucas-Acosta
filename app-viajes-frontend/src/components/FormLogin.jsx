import { useRef, useState } from "react";
import { reqLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const validateForm = (user) => {
  let errors = {};
  let regexUsername = /^[a-z0-9]+$/;

  // Validación para el campo 'username'
  if (!user.username.trim()) {
    errors.username = "El campo 'Nombre de Usuario' es requerido";
  } else if (!regexUsername.test(user.username.trim())) {
    errors.username = "El nombre de usuario debe ser todo en minúsculas y sin espacios";
  } else if (user.password.trim().length < 6) {
    errors.username = "El nombre de usuario debe tener al menos 4 caracteres";
  }

  // Validación para el campo 'password'
  if (!user.password.trim()) {
    errors.password = "El campo 'Contraseña' es requerido";
  } else if (user.password.trim().length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  return errors;
};
let styles = {
  fontWeight: "bold",
  color: "orange",
};

const FormLogin = () => {
  //const { axiosError, setAxiosError } = useState(false);
  const ref = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
    const formErrors = validateForm(user);
    setErrors(formErrors);
    //Envio de los datos al BackEnd
    if (Object.keys(formErrors).length === 0) {
      try {
        const res = await reqLogin(user);
        if (res.status !== 200) {
          console.log("NO 200: ", res.data);
          ref.current.reset();
        }
        login(res.data);
        navigate("/home");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "❌ Ocurrió un error",
          text: "Revisa tu usuario y/o contraseña",
        });
        console.log("Error: ", error);
      }

      //Limpia el formulario
      ref.current.reset();
    }
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
          {errors.username && <p style={styles}>{errors.username}</p>}
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="password">
            Contraseña
          </label>
          <input type="password" className="form-control" placeholder="**********" id="password" name="password" />
          {errors.password && <p style={styles}>{errors.password}</p>}
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
