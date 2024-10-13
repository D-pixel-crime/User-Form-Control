import { MainContainer } from "../containers/MainContainer";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import {
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
import FilterMenu from "../ui/FilterMenu";
import { useSnackbar } from "../contexts/ShowMessae";

const Logs = () => {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);
  const [filter, setFilter] = React.useState<
    "Login" | "Logout" | "Others" | null
  >(null);
  const { showMessage } = useSnackbar();

  React.useLayoutEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/get/logs?page=${page}${
            filter ? `&filter=${filter}` : ""
          }`,
          { withCredentials: true }
        );
        setLogs(data.logs || []);
        setTotalPages(data.totalPages || 1);

        showMessage("Logs fetched successfully", "success");
      } catch (error: any) {
        console.error(error.response?.message || "An error occurred");
        showMessage(error.response?.message || "An error occurred", "error");
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, [page, filter]);

  React.useLayoutEffect(() => {
    const handleCheck = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/get/isAdmin`,
          { withCredentials: true }
        );
        if (!data.isAdmin) {
          showMessage("Unauthorized", "error");
          window.location.href = "/";
        }
      } catch (error: any) {
        console.error(error.response.message);
        showMessage(
          error.response.message || "An Unexpected Error Occurred!",
          "error"
        );
        window.location.href = "/";
      }
    };
    handleCheck();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <MainContainer>
      <article className="w-full h-full flex flex-col gap-10 mb-5">
        <section className="px-10 py-5 flex items-center justify-end">
          <AccountMenu />
        </section>
        <section className="flex items-center justify-start px-5">
          <FilterMenu setFilter={setFilter} setPage={setPage} />
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
    </MainContainer>
  );
};

export default Logs;
