//import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { reqRegister } from "../api/auth";
import { useState, useRef } from "react";

function FormRegister() {
  //const { registro } = useAuth();
  const ref = useRef(null);
  const [hiddenSubmit, setHiddenSubmit] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(null);
  //Toma los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHiddenSubmit(true);
    //toma los datos del evento directamente
    const formData = new FormData(e.target);
    const avatar = formData.get("avatar"); //Toma el dato del input name="avatar"
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      avatar,
      email,
      username,
      password,
    };
    //Envio de los datos al BackEnd
    try {
      const res = await reqRegister(user);
      if (res.status !== 201) return alert("Error al registrarse");
      setSaveSuccessMessage("Registro correcto!");
      console.log("Usuario creado: ", res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
    //Limpia el formulario
    ref.current.reset();
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
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="email">
            Dirección de correo electrónico
          </label>
          <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="email@email.com" id="email" name="email" />
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="password">
            Contraseña
          </label>
          <input type="password" className="form-control" placeholder="**********" id="password" name="password" />
        </div>

        <div className="form-group">
          <label className="form-label mt-4" htmlFor="avatar">
            URL del para el avatar
          </label>
          <input type="url" className="form-control" placeholder="https://avatar.com/avatar.jpg" id="avatar" name="avatar" />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary mt-5" hidden={hiddenSubmit}>
            Enviar
          </button>
        </div>
        {saveSuccessMessage && (
          <div className="alert alert-dismissible alert-success mt-3">
            <strong>Bien hecho!</strong> {saveSuccessMessage}
            <Link to="/login" className="alert-link">
              Iniciar Sesión!
            </Link>
            .
          </div>
        )}
      </fieldset>
    </form>
  );
}
export default FormRegister;
