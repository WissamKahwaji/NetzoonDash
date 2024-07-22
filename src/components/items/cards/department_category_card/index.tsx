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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DepartmentCategoryCardProps {
  categoryId: string;
  name: string;
  nameAr: string;
  imageUrl: string;
}
const DepartmentCategoryCard = ({
  name,
  imageUrl,
  categoryId,
  nameAr,
}: DepartmentCategoryCardProps) => {
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] =
    useState<boolean>(false);
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;
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
            {selectedLang === "en" ? (
              <>
                {name.length > 20 ? (
                  <>
                    {name.slice(0, 20)}
                    <Box component={"span"}>...</Box>
                  </>
                ) : (
                  name
                )}
              </>
            ) : (
              <>
                {nameAr.length > 20 ? (
                  <>
                    {nameAr.slice(0, 20)}
                    <Box component={"span"}>...</Box>
                  </>
                ) : (
                  nameAr
                )}
              </>
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
            <Link to={`/category/${categoryId}`} reloadDocument>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
            <IconButton color="error" onClick={handleOpenDeleteCategoryDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <Link to={`/category/${categoryId}/products`} reloadDocument>
        <CardActionArea>
          <CardMedia
            component={"img"}
            sx={{ objectFit: "contain" }}
            src={imageUrl}
            height="100%"
            crossOrigin="anonymous"
          />
        </CardActionArea>
      </Link>

      <DeleteDepartmentCategoryDialog
        open={openDeleteCategoryDialog}
        onClose={handleCloseDeleteCategoryDialog}
        category={{ id: categoryId, name: name }}
      />
    </Card>
  );
};

export default DepartmentCategoryCard;
