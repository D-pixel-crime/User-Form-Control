import Form from "../containers/Form";
import { MainContainer } from "../containers/MainContainer";
import Cookies from "js-cookie";
import AccountMenu from "../ui/AccountMenu";

export const Home = () => {
  const name = decodeURIComponent(Cookies.get("name") || "");

  return (
    <MainContainer>
      <article className="w-full h-full flex flex-col gap-10 mb-5">
        <section className="px-10 py-5 flex items-center justify-end">
          <AccountMenu />
        </section>
        <section className="w-full flex-center flex-col">
          <h1 className="text-3xl text-center">
            Welcome,{" "}
            <span className="w-fit bg-gradient-to-tr from-violet-500 via-red-400 to-violet-500 text-transparent bg-clip-text">
              {name}
            </span>
          </h1>
          <Form />
        </section>
      </article>
    </MainContainer>
  );
};
