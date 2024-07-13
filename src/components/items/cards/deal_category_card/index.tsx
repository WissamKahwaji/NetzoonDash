import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDealCategoryDialog from "../../dialogs/delete_deal_category_dialog";

interface DealsCategoriesCardProps {
  categoryId: string;
  name: string;
}
const DealsCategoriesCard = ({
  name,

  categoryId,
}: DealsCategoriesCardProps) => {
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
          <CardActionArea onClick={() => navigate(`category/${categoryId}`)}>
            <Typography>
              {name.length > 50 ? (
                <>
                  {name.slice(0, 50)}
                  <Box component={"span"}>...</Box>
                </>
              ) : (
                name
              )}
            </Typography>
          </CardActionArea>
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
              onClick={() => navigate(`${categoryId}/edit`)}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteCategoryDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />

      <DeleteDealCategoryDialog
        open={openDeleteCategoryDialog}
        onClose={handleCloseDeleteCategoryDialog}
        category={{ id: categoryId, title: name }}
      />
    </Card>
  );
};

export default DealsCategoriesCard;
