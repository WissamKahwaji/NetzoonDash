import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "../../constants/index";

const ChooseOwnerPage = () => {
  const { data: usersInfo, isError, isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
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
        Choose Target User
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
          label="Search Users"
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
            <MenuItem value={""}>ALL</MenuItem>
            <MenuItem value={USER_TYPE.USER}>USER</MenuItem>
            <MenuItem value={USER_TYPE.CAR}>CAR</MenuItem>
            <MenuItem value={USER_TYPE.PLANES}>PLANES</MenuItem>
            <MenuItem value={USER_TYPE.SEA_COMPANIES}>SEA_COMPANIES</MenuItem>
            <MenuItem value={USER_TYPE.REAL_ESTATE}>REAL_ESTATE</MenuItem>
            <MenuItem value={USER_TYPE.DELIVERY_COMPANY}>
              DELIVERY_COMPANY
            </MenuItem>
            <MenuItem value={USER_TYPE.FACTORY}>FACTORY</MenuItem>
            <MenuItem value={USER_TYPE.LOCAL_COMPANY}>LOCAL_COMPANY</MenuItem>
            <MenuItem value={USER_TYPE.TRADER}>TRADER</MenuItem>
            <MenuItem value={USER_TYPE.FREEZONE}>FREEZONE</MenuItem>
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
                      <CardActionArea
                        onClick={() => navigate(`${user._id}/add`)}
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
