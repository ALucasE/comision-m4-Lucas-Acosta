import { Card, CardHeader } from "../components/Card";
import { CardViewPostsPrivate } from "../components/CardViewPostsPrivate";

const PostPrivate = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="m-3 ">Mis Publicaciones</h1>
        </CardHeader>

        <div className="m-3">
          <CardViewPostsPrivate />
        </div>
      </Card>
    </>
  );
};
export default PostPrivate;
