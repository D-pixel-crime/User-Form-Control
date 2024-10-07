import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./routes/Login";

const allRoutes = [
  {
    path: "/",
    element: <h1>Home</h1>,
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
