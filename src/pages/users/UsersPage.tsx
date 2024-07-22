import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";
import { useGetAllUsersQuery } from "../../apis/users/queries";
import LoadingPage from "../loading-page/LoadingPage";
import UserCard from "../../components/items/cards/users/UserCard";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const UsersPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const {
    data: usersInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(country);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    refetch();
  }, [country, refetch]);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = usersInfo?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
          mb: 1,
          color: "black",
        }}
      >
        {t("all_users")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {t("users_count")} : {usersInfo?.length}
        </Typography>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            // navigate(`/users/add-user`);
          }}
        >
          Add
        </Button>
      </Box> */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label={t("search")}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { lg: "50%", xs: "100%" } }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredUsers &&
          [...filteredUsers].reverse().map((user, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <UserCard key={index} user={user} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UsersPage;
