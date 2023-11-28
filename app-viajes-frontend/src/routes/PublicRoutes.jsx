import { Outlet } from "react-router-dom";

import { DefaultLayout } from "../layout/DefaultLayout";

export const PublicRoutes = () => {
  return (
    <>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  );
};
