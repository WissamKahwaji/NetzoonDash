import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import MuiTheme from "./libs/mui/theme";

const Wrapper = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <CssBaseline>
        <MuiTheme>
          <Routes />
          <ToastContainer />
        </MuiTheme>
      </CssBaseline>
    </QueryClientProvider>
  );
};

export default Wrapper;
