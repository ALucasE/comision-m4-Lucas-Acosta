import FormLogin from "../components/FormLogin";
import { Card, CardBody, CardHeader, CardTitle } from "../components/Card";

function LoginPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Inicia Sesión para crear publicaciones</CardTitle>
        </CardHeader>
        <CardBody>
          <FormLogin />
        </CardBody>
      </Card>
    </>
  );
}
export default LoginPage;
