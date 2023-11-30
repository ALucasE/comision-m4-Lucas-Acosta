import { Card, CardHeader } from "../components/Card";
import { FormNewPost } from "../components/FormNewPost";

const PostCreate = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="m-3 ">Crear una nueva publicación</h1>
        </CardHeader>
        <FormNewPost />
      </Card>
    </>
  );
};
export default PostCreate;
