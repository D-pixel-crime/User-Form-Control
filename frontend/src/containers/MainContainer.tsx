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
    <main className="w-screen h-screen bg-slate-300 overflow-x-hidden">
      {children}
    </main>
  );
};
