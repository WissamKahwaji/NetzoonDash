import Box from "@mui/material/Box";

import { DrawerHeader } from "./style";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FC, PropsWithChildren, useEffect } from "react";
import SideBar from "./sidebar";
import NavBar from "./navbar";
import useToggleEle from "../hooks/useToggleEle";
const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const matchSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [open, handleDrawerOpen, handleDrawerClose, setOpenDrawer] =
    useToggleEle(matchSmallScreen);
  useEffect(() => {
    setOpenDrawer(matchSmallScreen);
  }, [matchSmallScreen, setOpenDrawer]);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          width: open ? "calc(100vw - 240px)" : "calc(100vw - 73px)",
          flexGrow: 1,
          p: 3,
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
