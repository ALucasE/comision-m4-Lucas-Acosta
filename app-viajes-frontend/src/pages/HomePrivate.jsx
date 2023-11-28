import { Card, CardHeader } from "../components/Card";
import { CardViewPosts } from "../components/CardViewPosts";
//import { useAuth } from "../context/AuthContext";
//import { NavBarPrivate } from "../components/NavBarPrivate";
//<NavBarPrivate />
const HomePrivate = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="m-3 ">Publicaciones</h1>
        </CardHeader>

        <div className="m-3">
          <CardViewPosts />
        </div>
      </Card>
    </>
  );
};
export default HomePrivate;
