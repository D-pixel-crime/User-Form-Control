import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";

const allRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((eachRoute, index) => (
          <Route
            path={eachRoute.path}
            element={eachRoute.element}
            key={index}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
