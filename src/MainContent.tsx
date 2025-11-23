import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
const MainContent = () => {
  return (
    <Routes>
  {routes.map((link) =>
    link ? (
      <Route
        key={link.id}
        path={link.href}
        element={
      
          link.element
        }
      />
    ) : null
  )}
    </Routes>
  );
};

export default MainContent;
