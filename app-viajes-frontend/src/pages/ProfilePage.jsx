import { CardHeader, CardTitle } from "../components/Card";
import { FormPerfil } from "../components/FormPerfil";
import { CardPerfil } from "./CardPerfil";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <CardHeader>
        <CardTitle>Perfil de usuario @{user.username}</CardTitle>
      </CardHeader>

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <CardPerfil />
          </div>
          <div className="col-md-6 col-sm-12">
            <FormPerfil />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;

//style={{ maxWidth: 540 }}
