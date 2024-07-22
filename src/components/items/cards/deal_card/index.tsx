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
import { DealsItemModel } from "../../../../apis/deals/type";
import DeleteDealDialog from "../../dialogs/delete_deal_dialog";

interface DealCardProps {
  deal: DealsItemModel;
}

const DealCard = ({ deal: deal }: DealCardProps) => {
  const navigate = useNavigate();
  const [openDeleteDealDialog, setOpenDeleteDealDialog] =
    useState<boolean>(false);

  const handleOpenDeleteDealDialog = () => {
    setOpenDeleteDealDialog(true);
  };
  const handleCloseDeleteDealDialog = () => {
    setOpenDeleteDealDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {deal.name && deal.name.length > 20 ? (
              <>
                {deal.name.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              deal.name
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
                navigate(`${deal._id}/edit`);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleOpenDeleteDealDialog}>
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
          src={deal.imgUrl}
          height="240px"
          crossOrigin="anonymous"
        />
      </CardActionArea>

      <DeleteDealDialog
        open={openDeleteDealDialog}
        onClose={handleCloseDeleteDealDialog}
        deal={{ id: deal._id!, name: deal.name! }}
      />
    </Card>
  );
};

export default DealCard;
