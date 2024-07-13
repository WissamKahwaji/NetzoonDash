import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { ProductModel } from "../../../../apis/product/type";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteProductDialog from "../../dialogs/delete_product_dialog/DeleteProductDialog";
import { useState } from "react";

interface ProductCardProps {
  product: ProductModel;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [openDeleteProductDialog, setOpenDeleteProductDialog] =
    useState<boolean>(false);

  const handleOpenDeleteProductDialog = () => {
    setOpenDeleteProductDialog(true);
  };
  const handleCloseDeleteProductDialog = () => {
    setOpenDeleteProductDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {product.name.length > 20 ? (
              <>
                {product.name.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              product.name
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
                navigate(`${product._id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteProductDialog}>
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardActionArea
        onClick={() => {
          navigate(`${product._id}/edit`);
        }}
      >
        <CardMedia
          component={"img"}
          sx={{ objectFit: "contain" }}
          src={product.imageUrl}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteProductDialog
        open={openDeleteProductDialog}
        onClose={handleCloseDeleteProductDialog}
        product={{ id: product._id!, name: product.name }}
      />
    </Card>
  );
};

export default ProductCard;
