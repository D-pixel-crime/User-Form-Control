import { MainContainer } from "../containers/MainContainer";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import * as React from "react";
import AccountMenu from "../ui/AccountMenu";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const Logs = () => {
  const [logs, setLogs] = React.useState<any[]>([]); // Ensure logs is always an array
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);

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
    const handleFetch = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/get/logs/${page}`,
          { withCredentials: true }
        );
        setLogs(data.logs || []);
        setTotalPages(data.totalPages || 1);

        setIsSuccess({
          status: "success",
          message: "Logs fetched successfully",
        });
      } catch (error: any) {
        console.error(error.response?.message || "An error occurred");
        setIsSuccess({
          status: "error",
          message: error.response?.message || "Failed to fetch logs",
        });
      } finally {
        setLoading(false);
        handleClick(SlideTransition)();
      }
    };

    handleFetch();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <MainContainer>
      <article className="w-full h-full flex flex-col gap-10">
        <section className="px-10 py-5 flex items-center justify-end">
          <AccountMenu />
        </section>
        {loading ? (
          <section className="flex-center h-52">
            <InfinitySpin />
          </section>
        ) : (
          <section className="w-full h-full flex flex-col gap-2 px-5">
            {Array.isArray(logs) && logs.length > 0 ? (
              <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong className="text-xl text-violet-600">
                            ACTION
                          </strong>
                        </TableCell>
                        <TableCell>
                          <strong className="text-xl text-violet-600">
                            USER
                          </strong>
                        </TableCell>
                        <TableCell>
                          <strong className="text-xl text-violet-600">
                            EMAIL
                          </strong>
                        </TableCell>
                        <TableCell>
                          <strong className="text-xl text-violet-600">
                            DATE
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {logs.map((log: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <strong
                              className={`${
                                log.action === "Login"
                                  ? "text-green-500"
                                  : log.action === "Logout"
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {log.action}
                            </strong>
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.email}</TableCell>
                          <TableCell>{log.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  className="self-center mt-4"
                />
              </>
            ) : (
              <div>No Logs</div>
            )}
          </section>
        )}
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

export default Logs;
