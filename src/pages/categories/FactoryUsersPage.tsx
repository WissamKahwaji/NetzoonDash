import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFactoryUsersQuery } from "../../apis/departments/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import UserCard from "../../components/items/cards/users/UserCard";
import { useTranslation } from "react-i18next";

const FactoryUsersPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const {
    data: factoryUsers,
    isError,
    isLoading,
  } = useGetFactoryUsersQuery(id ?? "");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddUser = () => {
    navigate(
      `/categories/facroties-categories/add-user/factory/${factoryUsers?.title}`
    );
  };

  const filteredUsers = factoryUsers?.factory.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <TextField
          label={t("search")}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { lg: "50%", xs: "70%" } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          sx={{ height: "fit-content" }}
        >
          {t("add")}
        </Button>
      </Box>
      <Grid container spacing={4}>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <UserCard key={index} user={user} />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography
            component="h1"
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              mb: 3,
              ml: 3,
              color: "black",
            }}
          >
            No Users
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default FactoryUsersPage;
