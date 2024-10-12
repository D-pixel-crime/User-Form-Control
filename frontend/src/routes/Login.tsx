import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import googleIcon from "../assets/google.svg";

export const Login = () => {
  const email = Cookies.get("email");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (email) {
      window.location.href = "/";
    }
  }, [email]);

  const handleLogin = () => {
    setIsLogin(true);
    setTimeout(() => {
      window.open(`${import.meta.env.VITE_BACKEND_URI}/auth/google`, "_self");
    }, 500);
  };

  return (
    <main className="w-screen h-screen flex-center">
      <button
        className={`flex-center ${
          !isLogin ? "bg-green-600 border-2 shadow-md" : "bg-transparent"
        } px-2 py-1.5 border-green-600 text-white shadow-slate-500 rounded-md hover:text-green-600 hover:bg-transparent transition`}
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        disabled={isLogin}
      >
        {isLogin ? (
          <TailSpin width={50} />
        ) : (
          <span className="flex-center gap-2">
            <img src={googleIcon} alt="Google" className="w-10 h-10" />
            Login With Google
          </span>
        )}
      </button>
    </main>
  );
};
