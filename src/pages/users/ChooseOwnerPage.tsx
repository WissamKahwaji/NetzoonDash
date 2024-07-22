import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../apis/users/queries";
import LoadingPage from "../loading-page/LoadingPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { USER_TYPE } from "../../constants/index";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const ChooseOwnerPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  console.log(pathname);
  console.log("aaaaaaaaaaa");
  const {
    data: usersInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(country);
  // const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(() => {
    if (pathname === "/vehicles/owner") {
      return USER_TYPE.CAR;
    } else {
      return "";
    }
  });

  useEffect(() => {
    refetch();
  }, [country, refetch]);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = usersInfo?.filter(
    user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? user.userType === filterType : true)
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
          color: "black",
        }}
      >
        {t("choose_target_user")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <TextField
          label={t("search")}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { lg: "70%", xs: "100%" } }}
        />

        <Box sx={{ marginRight: "8px", marginBottom: "10px" }}>
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select ads type" }}
            IconComponent={ExpandMoreIcon}
          >
            {pathname !== "/vehicles/owner" && (
              <MenuItem value={""}>{t("all")}</MenuItem>
            )}
            {pathname !== "/vehicles/owner" && (
              <MenuItem value={USER_TYPE.USER}>{t("user")}</MenuItem>
            )}
            <MenuItem value={USER_TYPE.CAR}>{t("car")}</MenuItem>
            <MenuItem value={USER_TYPE.PLANES}>{t("planes")}</MenuItem>
            <MenuItem value={USER_TYPE.SEA_COMPANIES}>
              {t("sea_companies")}
            </MenuItem>
            {pathname !== "/vehicles/owner" && (
              <MenuItem value={USER_TYPE.REAL_ESTATE}>
                {t("real_estate")}
              </MenuItem>
            )}
            {pathname !== "/vehicles/owner" && (
              <MenuItem value={USER_TYPE.DELIVERY_COMPANY}>
                {t("delivery_companies")}
              </MenuItem>
            )}
            {pathname !== "/vehicles/owner" && (
              <Box>
                <MenuItem value={USER_TYPE.FACTORY}>{t("factory")}</MenuItem>
                <MenuItem value={USER_TYPE.LOCAL_COMPANY}>
                  {t("local_companies")}
                </MenuItem>
                <MenuItem value={USER_TYPE.TRADER}>{t("trader")}</MenuItem>
                <MenuItem value={USER_TYPE.FREEZONE}>{t("freezone")}</MenuItem>
                <MenuItem value={USER_TYPE.NEWS_AGENCY}>
                  {t("news_agency")}
                </MenuItem>
              </Box>
            )}
          </Select>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredUsers &&
          filteredUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <Card>
                  <CardHeader
                    title={
                      <Link to={`${user._id}/add`} reloadDocument>
                        <CardActionArea
                        // onClick={() => navigate(`${user._id}/add`)}
                        >
                          <Typography variant="h6">
                            {user.username.length > 60 ? (
                              <>
                                {user.username.slice(0, 60)}
                                <Box component="span">...</Box>
                              </>
                            ) : (
                              user.username
                            )}
                          </Typography>
                        </CardActionArea>
                      </Link>
                    }
                  />
                </Card>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ChooseOwnerPage;
