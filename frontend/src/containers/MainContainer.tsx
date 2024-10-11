import { useEffect } from "react";
import Cookies from "js-cookie";

interface mainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: mainContainerProps) => {
  const email = decodeURIComponent(Cookies.get("email") || "");

  useEffect(() => {
    if (email === "") {
      window.location.href = "/login";
    }
  });

  return (
    <main className="min-h-screen w-max-screen overflow-x-hidden bg-slate-300">
      {children}
    </main>
  );
};
