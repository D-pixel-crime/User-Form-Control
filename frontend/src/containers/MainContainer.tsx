interface mainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: mainContainerProps) => {
  return (
    <main className="w-screen min-h-screen bg-slate-300 overflow-x-hidden">
      {children}
    </main>
  );
};
