//import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { reqRegister } from "../api/auth";
import { useState, useRef } from "react";

const validateForm = (user) => {
  let errors = {};
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexUsername = /^[a-z0-9]+$/;

  // Validación para el campo 'username'
  if (!user.username.trim()) {
    errors.username = "El campo 'Nombre de Usuario' es requerido";
  } else if (!regexUsername.test(user.username.trim())) {
    errors.username = "El nombre de usuario debe ser todo en minúsculas y sin espacios";
  } else if (user.password.trim().length < 6) {
    errors.username = "El nombre de usuario debe tener al menos 4 caracteres";
  }

  // Validación para el campo 'avatar'
  if (!user.avatar.trim()) {
    errors.avatar = "El campo 'Avatar' es requerido";
  }

  // Validación para el campo 'email'
  if (!user.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(user.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
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

function FormRegister() {
  //const { registro } = useAuth();
  const ref = useRef(null);
  const [hiddenSubmit, setHiddenSubmit] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  //Toma los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHiddenSubmit(true);
    //toma los datos del evento directamente
    const formData = new FormData(e.target);
    const avatar = formData.get("avatar"); //Toma el dato del input name="avatar"
    const email = formData.get("email");
    const username = formData.get("username").toLowerCase();
    const password = formData.get("password");

    const user = {
      avatar,
      email,
      username,
      password,
    };

    const formErrors = validateForm(user);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      //Envio de los datos al BackEnd
      try {
        const res = await reqRegister(user);
        if (res.status === 201) {
          setSaveSuccessMessage("Registro correcto!");
          console.log("Usuario creado: ", res.data);
        } else {
          alert("Error al registrarse");
        }
      } catch (error) {
        alert("Error al registrarse");
        console.log("Error: ", error);
        setHiddenSubmit(false);
      }
      //Limpia el formulario
      ref.current.reset();
    } else {
      setHiddenSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <fieldset>
        {/* <legend>Registro</legend> */}

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="username">
            Nombre de usuario
          </label>
          <input type="text" className="form-control" placeholder="juanperez" id="username" name="username" />
          {errors.username && <p style={styles}>{errors.username}</p>}
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="email">
            Dirección de correo electrónico
          </label>
          <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="email@email.com" id="email" name="email" />
          {errors.email && <p style={styles}>{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="password">
            Contraseña
          </label>
          <input type="password" className="form-control" placeholder="**********" id="password" name="password" />
          {errors.password && <p style={styles}>{errors.password}</p>}
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="avatar">
            URL del para el avatar
          </label>
          <input type="url" className="form-control" placeholder="https://avatar.com/avatar.jpg" id="avatar" name="avatar" />
          {errors.avatar && <p style={styles}>{errors.avatar}</p>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary mt-5" hidden={hiddenSubmit}>
            Enviar
          </button>
        </div>
        {saveSuccessMessage && (
          <div className="alert alert-dismissible alert-success mt-3">
            <strong>Bien hecho! </strong> {saveSuccessMessage}
            <Link to="/login" className="alert-link">
              Iniciar Sesión!
            </Link>
          </div>
        )}
      </fieldset>
    </form>
  );
}
export default FormRegister;
