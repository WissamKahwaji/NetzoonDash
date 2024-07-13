import { FC, PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const MuiTheme: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2072B7",
      },
      secondary: {
        main: "#161717",
      },
      background: {
        default: "#dfe0e7",
      },
      text: {
        primary: "#000000",
      },
    },
    components: {
      MuiOutlinedInput: {
        defaultProps: {
          color: "secondary",
        },
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              color: "#000000", // Set text color inside text fields to black
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // Set default border color to gray
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // Keep border color gray on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // Keep border color gray when focused
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "gray", // Set label color to gray
            "&.Mui-focused": {
              color: "gray", // Keep label color gray when focused
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#4A4A4A", // Set typography color to dark gray
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
