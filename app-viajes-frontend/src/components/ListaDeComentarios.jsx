import { API_URL } from "../api/constantes";
import { helpPeticionesHttp } from "../helper/helpPeticionesHttp";
//API_URL = "http://localhost:3000/api/";
import { CardBody } from "./Card";
import Swal from "sweetalert2";
import { BsPencil, BsTrash3 } from "react-icons/bs";

export const ListaDeComentarios = ({ comentarios, eliminarComentario, refresh }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEditarComentario = (comentarioId) => {
    const comentarioFiltrado = comentarios.filter((element) => element._id === comentarioId);

    Swal.fire({
      title: "Editar Comentario",
      input: "text",
      inputValue: comentarioFiltrado[0].description,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un nuevo comentario";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let comentarioNuevo = result.value;
        let options = {
          headers: { "content-type": "application/json" },
          body: { description: comentarioNuevo },
        };
        helpPeticionesHttp().put(`${API_URL}comments/${comentarioId}`, options);
        refresh();
        Swal.fire({
          title: "¡Editado!",
          text: "Comentario editado correctamente.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <CardBody>
        <table className="table table-hover">
          <tbody>
            {comentarios.map((item, key) => (
              <tr key={key} className="table-active">
                <th scope="row">
                  <img src={item?.author?.avatar} className="rounded-circle border border-warning-subtle" width={40} />
                </th>
                <td>@{item?.author?.username}</td>
                <td colSpan={4}>{item?.description}</td>
                <td>
                  <div className="btn-group" hidden={item.author._id === user.id ? false : true}>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleEditarComentario(item._id)}>
                      <BsPencil />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        Swal.fire({
                          title: "Estas seguro/a?",
                          text: "¡No podrás revertir esto!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "¡Sí, bórralo!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            eliminarComentario(item._id);
                            Swal.fire({
                              title: "¡Eliminado!",
                              text: "Elemento eliminado.",
                              icon: "success",
                            });
                          }
                        });
                      }}
                    >
                      <BsTrash3 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

// hidden={item.author._id === id ? true : false}
//onClick={() => eliminarComentario(item._id)}
