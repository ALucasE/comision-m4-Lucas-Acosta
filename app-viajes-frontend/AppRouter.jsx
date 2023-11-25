import { Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
export default AppRouter;
