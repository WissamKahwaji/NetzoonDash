import { useNavigate } from "react-router-dom";
import {
  useGetAllCarsQuery,
  useGetAllPlansQuery,
  useGetAllShipsQuery,
} from "../../apis/vehicle/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { VehicleModel, VehicleType } from "../../apis/vehicle/type";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VehicleCard from "../../components/items/cards/vehicle_card/VehicleCard";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const VehicleListPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<VehicleType>(VehicleType.CARS);
  const [vehicleList, setVehicleList] = useState<VehicleModel[]>([]);
  const {
    data: carsInfo,
    isError: isErrorCars,
    isLoading: isLoadingCars,
    refetch: refetchCars,
  } = useGetAllCarsQuery(country, filterType === VehicleType.CARS);
  const {
    data: plansInfo,
    isError: isErrorPlans,
    isLoading: isLoadingPlans,
    refetch: refetchPlans,
  } = useGetAllPlansQuery(country, filterType === VehicleType.PLANES);
  const {
    data: shipsInfo,
    isError: isErrorShips,
    isLoading: isLoadingShips,
    refetch: refetchShips,
  } = useGetAllShipsQuery(country, filterType === VehicleType.SHIPS);
  const navigate = useNavigate();
  useEffect(() => {
    refetchCars();
    refetchPlans();
    refetchShips();
    if (carsInfo && filterType === VehicleType.CARS) {
      setVehicleList(carsInfo);
    } else if (plansInfo && filterType === VehicleType.PLANES) {
      setVehicleList(plansInfo);
    } else if (shipsInfo && filterType === VehicleType.SHIPS) {
      setVehicleList(shipsInfo);
    }
  }, [
    carsInfo,
    filterType,
    plansInfo,
    refetchCars,
    refetchPlans,
    refetchShips,
    shipsInfo,
    country,
  ]);
  if (isErrorCars || isErrorPlans || isErrorShips) return <div>Error !!!</div>;
  if (isLoadingCars || isLoadingPlans || isLoadingShips) return <LoadingPage />;

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
        {t("vehicles")}
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
          {t("add")}
        </Button>

        <Box sx={{ marginRight: "8px", marginBottom: "10px" }}>
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value as VehicleType)}
            displayEmpty
            inputProps={{ "aria-label": "Select ads type" }}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={VehicleType.CARS}>{t("car")}</MenuItem>
            <MenuItem value={VehicleType.PLANES}>{t("planes")}</MenuItem>
            <MenuItem value={VehicleType.SHIPS}>{t("ships")}</MenuItem>
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
