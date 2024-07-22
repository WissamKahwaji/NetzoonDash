import { Fragment, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo-white.png";

import { Drawer, DrawerHeader, LinkSx } from "../style";
import IProps from "./type";

import { NAV_LINKS } from "../../constants";
import { useTranslation } from "react-i18next";

const SideBar = ({ open }: IProps) => {
  const { t } = useTranslation();
  const [isScrolling, setIsScrolling] = useState(false);
  const { pathname } = useLocation();

  const handleDebounceScroll = useMemo(
    () =>
      debounce(() => {
        setIsScrolling(false);
      }, 500),
    []
  );
  const handleScroll = () => {
    setIsScrolling(true);
    handleDebounceScroll.cancel();
    handleDebounceScroll();
  };

  return (
    <Drawer variant="permanent" open={open} sx={{ background: "#efddc9" }}>
      <DrawerHeader
        sx={{
          background: theme => theme.palette.primary.main,
          color: "#eee",
          height: "65px",
          position: "sticky",
          top: 0,
          zIndex: 9,
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <img
          src={logo}
          alt={"asda"}
          loading="lazy"
          style={{
            width: "100%",
            height: "90%",
          }}
        />
        {/* <Stack direction={"row"}>
          <Logo sx={{ width: 50, height: 50 }} />
          <Name sx={{ width: 50, height: 50 }} />
        </Stack> */}
        {/* <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon sx={{ color: "#fff" }} />
        </IconButton> */}
      </DrawerHeader>
      <Box
        onScroll={handleScroll}
        sx={theme => ({
          background: "#2072B7",
          height: "100%",
          overflowY: "scroll",

          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: isScrolling
              ? theme.palette.primary.light
              : "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: isScrolling
              ? theme.palette.primary.main
              : "transparent",
          },
        })}
      >
        {NAV_LINKS.map((navLink, index) => {
          return (
            <Fragment key={index}>
              <Divider />
              <List disablePadding>
                <Box
                  component={Link}
                  sx={{
                    textDecoration: "none !important",

                    "&:hover": { color: "#fff" },
                  }}
                  to={navLink.href}
                >
                  <Tooltip title={open ? "" : navLink.name}>
                    <ListItem disablePadding sx={LinkSx}>
                      <ListItemButton
                        selected={pathname === navLink.href}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          color: "white",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 2,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <navLink.icon />
                        </ListItemIcon>
                        {open && (
                          <ListItemText>
                            <Typography sx={{ color: "white" }}>
                              {t(navLink.name)}
                            </Typography>
                          </ListItemText>
                        )}
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                </Box>
              </List>
            </Fragment>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default SideBar;
