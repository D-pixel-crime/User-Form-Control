import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import Logs from "./routes/Logs";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheck, setIsCheck] = useState(true);

  useLayoutEffect(() => {
    const handleCheck = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/get/isAdmin`,
          { withCredentials: true }
        );
        if (data.isAdmin) {
          setIsAdmin(true);
        }
        setIsCheck(false);
      } catch (error: any) {
        console.error(error.response.message);
      }
    };
    handleCheck();
  }, []);

  const allRoutes = [
    {
      path: "/",
      element: isAdmin ? <Logs /> : <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  return isCheck ? (
    <main className="w-screen h-screen flex-center">
      <RotatingLines width="50" />
    </main>
  ) : (
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
