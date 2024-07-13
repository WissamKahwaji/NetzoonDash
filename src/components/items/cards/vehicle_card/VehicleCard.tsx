import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { VehicleModel } from "../../../../apis/vehicle/type";
import DeleteVehicleDialog from "../../dialogs/delete_vehicle_dialog";
interface VehicleCardProps {
  vehicle: VehicleModel;
}

const VehicleCard = ({ vehicle: vehicle }: VehicleCardProps) => {
  const navigate = useNavigate();
  const [openDeleteVehicleDialog, setOpenDeleteVehicleDialog] =
    useState<boolean>(false);

  const handleOpenDeleteVehicleDialog = () => {
    setOpenDeleteVehicleDialog(true);
  };
  const handleCloseDeleteVehicleDialog = () => {
    setOpenDeleteVehicleDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {vehicle.name && vehicle.name.length > 20 ? (
              <>
                {vehicle.name.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              vehicle.name
            )}
          </Typography>
        }
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              onClick={() => {
                navigate(`${vehicle._id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteVehicleDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardActionArea
        onClick={() => {
          //   navigate(`${product._id}/edit`);
        }}
      >
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={vehicle.imageUrl}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteVehicleDialog
        open={openDeleteVehicleDialog}
        onClose={handleCloseDeleteVehicleDialog}
        vehicle={{ id: vehicle._id!, name: vehicle.name! }}
      />
    </Card>
  );
};

export default VehicleCard;
