import Form from "../containers/Form";
import { MainContainer } from "../containers/MainContainer";
import Cookies from "js-cookie";
import AccountMenu from "../ui/AccountMenu";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Alert, AlertTitle } from "@mui/material";
import * as React from "react";
import { ProgressBar } from "react-loader-spinner";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import axios from "axios";
import { Link } from "react-router-dom";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const Home = () => {
  const name = decodeURIComponent(Cookies.get("name") || "");
  const [isAlreadySubmitted, setIsAlreadySubmitted] = React.useState(false);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);
  const [isWhatsappLinkGenerated, setIsWhatsappLinkGenerated] = React.useState({
    status: false,
    link: "",
  });

  const [isSuccess, setIsSuccess] = React.useState({
    status: "error" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      setState({
        open: true,
        Transition,
      });
    };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  React.useLayoutEffect(() => {
    const handleCheck = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/get/check-customer`,
          {
            withCredentials: true,
          }
        );

        if (data.message === "Customer found.") {
          setIsAlreadySubmitted(true);
          setIsSuccess({
            status: "success",
            message: "Already Submitted!",
          });
        }
      } catch (error: any) {
        console.log(error.response.data.message);
        setIsAlreadySubmitted(false);
        setIsSuccess({
          status: "error",
          message: error.response.data.message,
        });
      } finally {
        setIsInitialLoad(false);
        handleClick(SlideTransition)();
      }
    };

    handleCheck();
  }, []);

  return (
    <MainContainer>
      <article className="w-full h-full flex flex-col gap-10">
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
          {isInitialLoad ? (
            <section className="flex-center h-52">
              <ProgressBar barColor="#54ff2a" />
            </section>
          ) : isAlreadySubmitted ? (
            <section className="flex-center mt-10 flex-col">
              <VerifiedTwoToneIcon
                sx={{
                  color: "#00c80d",
                  fontSize: 150,
                }}
              />
              <span className="text-slate-500">Already Submitted!</span>
              {isWhatsappLinkGenerated.status && (
                <div className="flex-center w-1/2 mt-10 h-full flex-col gap-1">
                  <span className="underline text-xl text-green-600">
                    THANK YOU FOR SUBMITTING! <br />
                  </span>
                  <Link
                    to={isWhatsappLinkGenerated.link}
                    className="break-words underline text-blue-500"
                  >
                    {isWhatsappLinkGenerated.link.substring(0, 50)}...
                  </Link>
                </div>
              )}
            </section>
          ) : (
            <Form
              SlideTransition={SlideTransition}
              setIsAlreadySubmitted={setIsAlreadySubmitted}
              handleClick={handleClick}
              setIsSuccess={setIsSuccess}
              setIsWhatsappLinkGenerated={setIsWhatsappLinkGenerated}
            />
          )}
        </section>
      </article>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess.status}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{isSuccess.status}</AlertTitle>
          {isSuccess.message}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};
