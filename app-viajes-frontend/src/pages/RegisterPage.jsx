import FormRegister from "../components/FormRegister";
import { Card, CardBody, CardHeader, CardTitle } from "../components/Card";

function RegisterPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Crea tu cuenta para crear publicaciones</CardTitle>
        </CardHeader>
        <CardBody>
          <FormRegister />
        </CardBody>
      </Card>
    </>
  );
}
export default RegisterPage;
