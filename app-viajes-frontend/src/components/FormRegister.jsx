//import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { reqRegister, checkEmail, checkUsername } from "../api/auth";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { BsCheckSquare } from "react-icons/bs";
import { FcCheckmark, FcCancel } from "react-icons/fc";

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
  const [isEmailDisponible, setIsEmailDisponible] = useState(false);
  const [emailDisponible, setEmailDisponible] = useState(null);
  const [isUserNameDisponible, setIsUserNameDisponible] = useState(false);
  const [usernameDisponible, setUsernameDisponible] = useState(null);
  //VERIFICA SI EXISTE EL MAIL - TRUE/FALSE
  const checkEmailAvailability = async (email) => {
    try {
      const response = await checkEmail(email);
      //Setea el estado por verdadero o falso - Si ambos están en TRUE activa el botón de enviar
      setIsEmailDisponible(response.data.available);
      if (response.data.available) {
        //Setea la respuesta para dejar un mensaje
        setEmailDisponible(<FcCheckmark />);
      } else {
        setEmailDisponible(<FcCancel />);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Error al verificar disponibilidad de email",
      });
      console.error("Error al verificar disponibilidad de email:", error);
    }
  };

  //VERIFICA SI EXISTE EL USERNAME - TRUE/FALSE
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await checkUsername(username);
      //Setea el estado por verdadero o falso - Si ambos están en TRUE activa el botón de enviar
      setIsUserNameDisponible(response.data.available);
      console.log("response user", response.data.available);
      if (response.data.available) {
        //Setea la respuesta para dejar un mensaje
        setUsernameDisponible(<FcCheckmark />);
        console.log("Nombre de usuario disponible.");
      } else {
        setUsernameDisponible(<FcCancel />);
        console.log("Nombre de usuario NO disponible.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Error al verificar disponibilidad de username",
      });
      console.error("Error al verificar disponibilidad de username:", error);
    }
  };
  //MANEJA LA CONSULTA AL BE AL PRESIONAR EL BOTON DE CHECK
  const handleCheckEmailAvailability = () => {
    const email = ref.current.querySelector("#email").value;
    if (email) {
      checkEmailAvailability(email);
    }
  };
  //MANEJA LA CONSULTA AL BE AL PRESIONAR EL BOTON DE CHECK
  const handleCheckUsernameAvailability = () => {
    const username = ref.current.querySelector("#username").value;
    if (username) {
      checkUsernameAvailability(username);
    }
  };
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
          Swal.fire({
            icon: "error",
            title: "Ocurrió un error",
            text: "El servidor rechazo la solicitud",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error",
          text: "El servidor rechazo la solicitud",
        });
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
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="juanperez" aria-describedby="button-addon2" id="username" name="username" />
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={() => {
                handleCheckUsernameAvailability();
                //setIsEmailChecked(false); // Reinicia el estado de verificación de email
              }}
            >
              <BsCheckSquare />
            </button>
          </div>
          {usernameDisponible && <div className="ms-2">{usernameDisponible}</div>}
          {/* <div className="feedback">Nombre de usuario disponible.</div> */}
          {errors.username && <p style={styles}>{errors.username}</p>}
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="username">
            Dirección de correo electrónico
          </label>
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="email@email.com" aria-describedby="emailHelp" id="email" name="email" />
            <button
              className="btn btn-primary"
              type="button"
              id="emailHelp"
              onClick={() => {
                handleCheckEmailAvailability();
              }}
            >
              <BsCheckSquare />
            </button>
          </div>
          {emailDisponible && <div className="ms-2">{emailDisponible}</div>}
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
          <button type="submit" className="btn btn-primary mt-5" hidden={hiddenSubmit} disabled={!isEmailDisponible || !isUserNameDisponible}>
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
        <span className="badge bg-secondary mt-2">Para activar el botón de enviar verifica si los están disponibles el usuario y la contraseña</span>
      </fieldset>
    </form>
  );
}
export default FormRegister;

// disabled={isEmailDisponible && isUserNameDisponible}
