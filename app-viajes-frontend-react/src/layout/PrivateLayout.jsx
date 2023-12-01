// import { Card } from "../components/Card";
import { NavBarPrivate } from "../components/NavBarPrivate";
export const PrivateLayout = ({ children }) => {
  return (
    <>
      <NavBarPrivate />
      <div className="container">
        <div className="container-sm mt-1">
          <div className="card text-white bg-secondary mb-3">{children}</div>
        </div>
      </div>
    </>
  );
};
