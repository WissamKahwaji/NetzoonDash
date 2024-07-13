import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAdsDialog from "../../dialogs/delete_ads_dialog";

interface AdsCardProps {
  adsId: string;
  name: string;
  imageUrl: string;
}
const AdsCard = ({ name, imageUrl, adsId }: AdsCardProps) => {
  const [openDeleteAdsDialog, setOpenDeleteAdsDialog] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDeleteAdsDialog = () => {
    setOpenDeleteAdsDialog(true);
  };
  const handleCloseDeleteAdsDialog = () => {
    setOpenDeleteAdsDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {name.length > 20 ? (
              <>
                {name.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              name
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
              onClick={() => navigate(`${adsId}/edit`)}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteAdsDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardActionArea onClick={() => navigate(`${adsId}/edit`)}>
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={imageUrl}
          height="200px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteAdsDialog
        open={openDeleteAdsDialog}
        onClose={handleCloseDeleteAdsDialog}
        ads={{ id: adsId, name: name }}
      />
    </Card>
  );
};

export default AdsCard;
