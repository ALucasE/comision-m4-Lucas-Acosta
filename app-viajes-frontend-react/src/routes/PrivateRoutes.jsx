import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Cargando } from "../components/Cargando";
import { useEffect } from "react";
import { PrivateLayout } from "../layout/PrivateLayout";

export const PrivateRoutes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate("/login");
    }
    // if (auth !== null && auth !== undefined) {
    //   console.log("Private Route: ", auth);
    //   navigate("/home");
    // }
  }, [auth, navigate]);

  if (auth === undefined) return <Cargando />;

  return (
    <>
      <PrivateLayout>
        <Outlet />
      </PrivateLayout>
    </>
  );
};
