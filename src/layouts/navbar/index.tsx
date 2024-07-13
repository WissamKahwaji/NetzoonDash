import { Box, Toolbar } from "@mui/material";

import { AppBar } from "../style";
import Logo from "../../assets/logo-white.png";
import TProps from "./type";

const NavBar = ({ open }: TProps) => {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ background: theme => theme.palette.primary.main }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 3 },
            alignItems: "center",
            width: "40%",
          }}
        >
          {!open && (
            <img
              src={Logo}
              alt={"asda"}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
