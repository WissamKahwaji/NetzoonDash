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
import { ServiceModel } from "../../../../apis/services/type";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import DeleteServiceDialog from "../../dialogs/delete_service_dialog";
interface ServiceCardProps {
  service: ServiceModel;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  const [openDeleteServiceDialog, setOpenDeleteServiceDialog] =
    useState<boolean>(false);

  const handleOpenDeleteServiceDialog = () => {
    setOpenDeleteServiceDialog(true);
  };
  const handleCloseDeleteServiceDialog = () => {
    setOpenDeleteServiceDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {service.title.length > 20 ? (
              <>
                {service.title.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              service.title
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
                navigate(`${service._id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteServiceDialog}>
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
          src={service.imageUrl}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteServiceDialog
        open={openDeleteServiceDialog}
        onClose={handleCloseDeleteServiceDialog}
        service={{ id: service._id!, name: service.title }}
      />
    </Card>
  );
};

export default ServiceCard;
