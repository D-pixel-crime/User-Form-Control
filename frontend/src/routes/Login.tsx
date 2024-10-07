import axios from "axios";
import Cookies from "js-cookie";

export const Login = () => {
  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URI}/auth/google`, "_self");
  };

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_URI}/auth/logout`);
    Cookies.remove("user");
  };

  return (
    <div className="w-full h-screen flex-center">
      <button
        className="flex-center bg-green-600 px-2 py-1.5 text-white rounded-md hover:text-green-500 hover:bg-transparent transition"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Google OAuth
      </button>
    </div>
  );
};
