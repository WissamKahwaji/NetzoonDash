import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import MuiTheme from "./libs/mui/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { CountryProvider } from "./context/CountryContext";

const Wrapper = () => {
  const queryClient = new QueryClient();
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <CssBaseline>
          <CountryProvider>
            <MuiTheme>
              <Routes />
              <ToastContainer />
            </MuiTheme>
          </CountryProvider>
        </CssBaseline>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default Wrapper;
