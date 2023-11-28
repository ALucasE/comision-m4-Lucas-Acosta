import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader } from "../components/Card";
import { CardViewPosts } from "../components/CardViewPosts";
const HomePage = () => {
  //####ENVIA A HOME A LOS USUARIOS REGISTRADOS
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth !== null && auth !== undefined) {
      navigate("/home");
    }
  }, [auth, navigate]);
  //####ENVIA A HOME A LOS USUARIOS REGISTRADOS

  return (
    <Card>
      <CardHeader>
        <h1 className="m-3 ">Publicaciones</h1>
      </CardHeader>

      <div className="m-3">
        <CardViewPosts />
      </div>
    </Card>
  );
};
export default HomePage;

{
  /* <CardHeader>Header</CardHeader>
      <CardBody>
        <CardViewPost />
      </CardBody>
      <CardFooter>Footer</CardFooter> */
}
