import { Card } from "../components/Card";
import { NavBarPrivate } from "../components/NavBarPrivate";
export const PrivateLayout = ({ children }) => {
  return (
    <>
      <NavBarPrivate />
      <Card>{children}</Card>
    </>
  );
};
