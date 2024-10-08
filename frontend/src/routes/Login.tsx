export const Login = () => {
  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URI}/auth/google`, "_self");
  };

  return (
    <div className="w-full h-screen flex-center">
      <button
        className="flex-center bg-green-600 px-2 py-1.5 border-2 border-green-600 text-white rounded-md hover:text-green-600 hover:bg-transparent transition"
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
