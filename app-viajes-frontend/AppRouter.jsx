import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./src/pages/HomePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
