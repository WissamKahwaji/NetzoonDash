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

interface ImageTitleCardProps {
  id: string;
  name: string;
  imageUrl: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onClick?: () => void;
}
const ImageTitleCard = ({
  name,
  imageUrl,
  onDeleteClick,
  onEditClick,
  onClick,
}: ImageTitleCardProps) => {
  // const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] =
  //   useState<boolean>(false);

  // const handleOpenDeleteCategoryDialog = () => {
  //   setOpenDeleteCategoryDialog(true);
  // };
  // const handleCloseDeleteCategoryDialog = () => {
  //   setOpenDeleteCategoryDialog(false);
  // };
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
            <IconButton color="primary" onClick={onEditClick}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={onDeleteClick}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardActionArea onClick={onClick}>
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={imageUrl}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      {/* <DeleteDepartmentCategoryDialog
          open={openDeleteCategoryDialog}
          onClose={handleCloseDeleteCategoryDialog}
          category={{ id: categoryId, name: name }}
        /> */}
    </Card>
  );
};

export default ImageTitleCard;
