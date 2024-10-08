import axios from "axios";
import Cookies from "js-cookie";

export const Home = () => {
  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_URI}/auth/logout`, {
      withCredentials: true,
    });
  };

  return (
    <article className="w-full h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Home page!</h1>
      <br />
      {Cookies.get("user") && (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="bg-red-600 hover:bg-transparent rounded-md text-white hover:text-red-500 border-2 border-red-600 px-2 py-1.5"
        >
          Logout
        </button>
      )}
    </article>
  );
};
