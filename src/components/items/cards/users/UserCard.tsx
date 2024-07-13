import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  CardActionArea,
} from "@mui/material";

import { UserModel } from "../../../../apis/users/type";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteUserDialog from "../../dialogs/delete_user_dialog/DeleteUserDialog";

interface UserCardProps {
  user: UserModel;
}

const UserCard = ({ user }: UserCardProps) => {
  const [openDeleteUserDialog, setOpenDeleteUserDialog] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDeleteUserDialog = () => {
    setOpenDeleteUserDialog(true);
  };
  const handleCloseDeleteUserDialog = () => {
    setOpenDeleteUserDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <CardActionArea
            onClick={() => navigate(`/users/edit-user/${user._id}`)}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <CardMedia
                component="img"
                sx={{
                  objectFit: "contain",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                }}
                crossOrigin="anonymous"
                src={user.profilePhoto}
                alt={`${user.username}'s profile photo`}
              />
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
            </Stack>
          </CardActionArea>
        }
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "2px",
            }}
          >
            <IconButton color="error" onClick={handleOpenDeleteUserDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <DeleteUserDialog
        open={openDeleteUserDialog}
        onClose={handleCloseDeleteUserDialog}
        user={{ id: user._id!, name: user.username }}
      />
    </Card>
  );
};

export default UserCard;
