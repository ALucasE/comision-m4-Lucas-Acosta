// import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { NavBarPublic } from "../components/NavBarPublic";

export const DefaultLayout = ({ children }) => {
  //container sm + Card texto blanco + color secundario
  return (
    <>
      <NavBarPublic />
      <div className="container-sm mt-5">
        <div className="card text-white bg-secondary mb-3">{children}</div>
      </div>
      <Footer />
    </>
  );
};
