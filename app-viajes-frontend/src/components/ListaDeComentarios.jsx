import { CardBody } from "./Card";

// import { useParams } from "react-router-dom";

import { BsPencil, BsTrash3 } from "react-icons/bs";

export const ListaDeComentarios = ({ comentarios }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const eliminarComentario = () => {};

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
                    <button type="button" className="btn btn-primary btn-sm">
                      <BsPencil />
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => eliminarComentario(item._id)}>
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
