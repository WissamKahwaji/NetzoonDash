import { Box, Grid, Toolbar } from "@mui/material";
import { AppBar } from "../style";
import Logo from "../../assets/logo-white.png";
import TProps from "./type";
import LanguageButton from "../../components/items/buttons/languageButton";

import CountryPicker from "../../components/items/buttons/countryPicker";

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
          <LanguageButton className="language-button" />
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CountryPicker />
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
