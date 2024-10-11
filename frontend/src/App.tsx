import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import Logs from "./routes/Logs";

const allRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logs",
    element: <Logs />,
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
