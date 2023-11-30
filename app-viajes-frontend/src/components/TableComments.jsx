import { CardBody, CardTitle } from "./Card";
import { usePostContext } from "../context/PostContext";

export const TableComments = () => {
  const { currentComments } = usePostContext();
  if (currentComments === null) {
    return (
      <CardBody>
        <CardTitle>Aun no hay comentarios</CardTitle>
      </CardBody>
    );
  } else {
    return (
      <>
        <CardBody>
          <table className="table table-hover">
            <tbody>
              {currentComments.map((item, key) => (
                <tr key={key} className="table-active">
                  <th scope="row">
                    <img src={item?.author?.avatar} className="rounded-circle border border-warning-subtle" width={40} />
                  </th>
                  <td>@{item?.author?.username}</td>
                  <td colSpan={4}>{item?.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </>
    );
  }
};
