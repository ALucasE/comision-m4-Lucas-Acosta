import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
import useInput from "../hooks/useInput";
import { API_URL } from "../api/constantes";
import Swal from "sweetalert2";
import { useState } from "react";

const validateForm = (data) => {
  let errors = {};

  // Validación para el campo 'password'
  if (!data.newPassword.trim()) {
    errors.newPassword = "El campo 'Contraseña' es requerido";
  } else if (data.newPassword.trim().length < 8) {
    errors.newPassword = "La contraseña debe tener al menos 8 caracteres";
  }

  return errors;
};
//Estilo para los errores
let styles = {
  fontWeight: "bold",
  color: "orange",
};

const inicialState = {
  oldPassword: "",
  newPassword: "",
};

export const FormPerfil = () => {
  const [errors, setErrors] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const { formState, onInputChange, reset } = useInput(inicialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { oldPassword, newPassword } = formState;
    let data = {
      oldPassword,
      newPassword,
      userId: user.id,
    };
    //Validacion de errores
    const formErrors = validateForm(data);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      let options = {
        body: data,
        headers: { "content-type": "application/json" },
      };
      helpPeticionesHttp()
        .put(`${API_URL}auth/change-password`, options)
        .then((res) => {
          if (!res.err) {
            Swal.fire({
              text: "Los cambios fueron guardados",
              icon: "success",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Ocurrió un error",
              text: "El servidor rechazo la solicitud",
            });
          }
        });
    }
    reset();
  };

  return (
    <>
      <form className="form-group row mt-3 me-1" onSubmit={handleSubmit}>
        <p className="card-text">Modificar contraseña</p>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text">Contraseña Actual</span>
          <input type="password" className="form-control" name="oldPassword" onInput={onInputChange} value={formState.oldPassword} />
        </div>

        <div className="input-group input-group-sm mb-2">
          <span className="input-group-text">Contraseña nueva</span>
          <input type="password" className="form-control" name="newPassword" onInput={onInputChange} value={formState.newPassword} />
          {errors.newPassword && <small style={styles}>{errors.newPassword}</small>}
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Actualizar
        </button>
      </form>
    </>
  );
};
