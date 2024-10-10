import { useEffect } from "react";
import Cookies from "js-cookie";

export const Login = () => {
  const email = Cookies.get("email");

  useEffect(() => {
    if (email) {
      window.location.href = "/";
    }
  }, [email]);

  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URI}/auth/google`, "_self");
  };

  return (
    <main className="w-screen h-screen flex-center">
      <button
        className="flex-center bg-green-600 px-2 py-1.5 border-2 border-green-600 text-white rounded-md hover:text-green-600 hover:bg-transparent transition"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Google OAuth
      </button>
    </main>
  );
};
