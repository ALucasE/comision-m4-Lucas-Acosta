import { Card } from "../components/Card";
import { NavBarPublic } from "../components/NavBarPublic";

export const DefaultLayout = ({ children }) => {
  //container sm + Card texto blanco + color secundario
  return (
    <>
      <NavBarPublic />
      <Card>{children}</Card>
    </>
  );
};
