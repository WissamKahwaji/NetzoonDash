import { useNavigate } from "react-router-dom";
import {
  useGetAllCarsQuery,
  useGetAllPlansQuery,
} from "../../apis/vehicle/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { VehicleModel, VehicleType } from "../../apis/vehicle/type";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VehicleCard from "../../components/items/cards/vehicle_card/VehicleCard";

const VehicleListPage = () => {
  const [filterType, setFilterType] = useState<VehicleType>(VehicleType.CARS);
  const [vehicleList, setVehicleList] = useState<VehicleModel[]>([]);
  const {
    data: carsInfo,
    isError: isErrorCars,
    isLoading: isLoadingCars,
  } = useGetAllCarsQuery("AE", filterType === VehicleType.CARS);
  const {
    data: plansInfo,
    isError: isErrorPlans,
    isLoading: isLoadingPlans,
  } = useGetAllPlansQuery("AE", filterType === VehicleType.PLANES);
  const navigate = useNavigate();
  useEffect(() => {
    if (carsInfo && filterType === VehicleType.CARS) {
      setVehicleList(carsInfo);
    } else if (plansInfo && filterType === VehicleType.PLANES) {
      setVehicleList(plansInfo);
    }
  }, [carsInfo, filterType, plansInfo]);
  if (isErrorCars || isErrorPlans) return <div>Error !!!</div>;
  if (isLoadingCars || isLoadingPlans) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        Vehicles
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "40px",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            navigate(`owner`);
          }}
        >
          Add Vehicle
        </Button>

        <Box sx={{ marginRight: "8px", marginBottom: "10px" }}>
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value as VehicleType)}
            displayEmpty
            inputProps={{ "aria-label": "Select ads type" }}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={VehicleType.CARS}>CARS</MenuItem>
            <MenuItem value={VehicleType.PLANES}>PLANES</MenuItem>
          </Select>
        </Box>
      </Box>
      <Grid container gap={4}>
        {vehicleList &&
          vehicleList.map((vehicle, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <VehicleCard vehicle={vehicle} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default VehicleListPage;
