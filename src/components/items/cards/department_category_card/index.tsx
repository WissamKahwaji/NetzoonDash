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

import DeleteDepartmentCategoryDialog from "../../dialogs/delete_department_category_dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DepartmentCategoryCardProps {
  categoryId: string;
  name: string;
  imageUrl: string;
}
const DepartmentCategoryCard = ({
  name,
  imageUrl,
  categoryId,
}: DepartmentCategoryCardProps) => {
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(true);
  };
  const handleCloseDeleteCategoryDialog = () => {
    setOpenDeleteCategoryDialog(false);
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
              onClick={() => navigate(`/category/${categoryId}`)}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteCategoryDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardActionArea
        onClick={() => navigate(`/category/${categoryId}/products`)}
      >
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={imageUrl}
          height="100%"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteDepartmentCategoryDialog
        open={openDeleteCategoryDialog}
        onClose={handleCloseDeleteCategoryDialog}
        category={{ id: categoryId, name: name }}
      />
    </Card>
  );
};

export default DepartmentCategoryCard;
