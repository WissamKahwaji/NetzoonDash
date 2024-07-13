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
import DeleteNewsDialog from "../../dialogs/delete_news_dialog";

interface NewsCardProps {
  newsId: string;
  name: string;
  imageUrl: string;
}
const NewsCard = ({ name, imageUrl, newsId: newsId }: NewsCardProps) => {
  const [openDeleteNewsDialog, setOpenDeleteNewsDialog] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDeleteNewsDialog = () => {
    setOpenDeleteNewsDialog(true);
  };
  const handleCloseDeleteNewsDialog = () => {
    setOpenDeleteNewsDialog(false);
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
              onClick={() => navigate(`${newsId}/edit`)}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteNewsDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardActionArea onClick={() => navigate(`${newsId}/edit`)}>
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={imageUrl}
          height="200px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteNewsDialog
        open={openDeleteNewsDialog}
        onClose={handleCloseDeleteNewsDialog}
        news={{ id: newsId, name: name }}
      />
    </Card>
  );
};

export default NewsCard;
