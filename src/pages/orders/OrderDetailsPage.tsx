import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useEditOrderStatusMutation,
  useGetOrderByIdQuery,
} from "../../apis/order/queries";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingPage from "../loading-page/LoadingPage";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { OrderStatusEnum } from "../../apis/order/type";
import { useTranslation } from "react-i18next";

const OrderDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: orderInfo, isError, isLoading } = useGetOrderByIdQuery(id!);
  const { mutate: deleteOrder } = useDeleteOrderMutation();
  const { mutate: editOrderStatus } = useEditOrderStatusMutation();
  const [deliveryFee, setDeliveryFee] = useState<number>();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [open, setOpen] = useState(false);
  const [editStatusDialogOpen, setEditStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEditStatusDialog = () => {
    setEditStatusDialogOpen(true);
  };

  const handleCloseEditStatusDialog = () => {
    setEditStatusDialogOpen(false);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    if (orderInfo) {
      const fee = orderInfo.grandTotal - (orderInfo.subTotal ?? 0);
      setDeliveryFee(fee);
      const total = orderInfo.grandTotal + (orderInfo.serviceFee ?? 0);
      setTotalAmount(total);
    }
  }, [orderInfo]);

  const handleDeleteOrder = () => {
    if (orderInfo && orderInfo._id) {
      deleteOrder(orderInfo?._id);
    }
  };

  const handleEditOrderStatus = () => {
    if (orderInfo && orderInfo._id) {
      editOrderStatus({
        orderStatus: selectedStatus,
        _id: orderInfo._id,
      });
      handleCloseEditStatusDialog();
    }
  };

  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Paper sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Stack>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
              {t("order_details")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("order_id")} :
            </Typography>
            <Typography>{orderInfo?._id}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("date")} :
            </Typography>
            <Typography>
              {format(new Date(orderInfo?.createdAt ?? ""), "PPP")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("seller_name")} :
            </Typography>
            <Typography>{orderInfo?.clientId.username}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("buyer_name")} :
            </Typography>
            <Typography>{orderInfo?.userId.username}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("buyer_mobile_number")} :
            </Typography>
            <Typography sx={{ direction: "ltr" }}>
              {orderInfo?.mobile}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("shipping_address")} :
            </Typography>
            <Typography>{orderInfo?.shippingAddress}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("sub_total_to_seller")}:
            </Typography>
            <Typography>
              {orderInfo?.subTotal?.toLocaleString?.("en-US", {
                style: "currency",
                currency: "AED",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("service_fee")} :
            </Typography>
            <Typography>
              {orderInfo?.serviceFee?.toLocaleString?.("en-US", {
                style: "currency",
                currency: "AED",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("delivery_fee")} :
            </Typography>
            <Typography>
              {deliveryFee?.toLocaleString?.("en-US", {
                style: "currency",
                currency: "AED",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("grand_total_without_serviceFee")}:
            </Typography>
            <Typography>
              {orderInfo?.grandTotal?.toLocaleString?.("en-US", {
                style: "currency",
                currency: "AED",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("total_amount")} :
            </Typography>
            <Typography>
              {totalAmount?.toLocaleString?.("en-US", {
                style: "currency",
                currency: "AED",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              {t("order_status")} :
            </Typography>
            <Typography>{orderInfo?.orderStatus}</Typography>
          </Stack>

          <Stack direction="row" gap={2} sx={{ mt: 2 }}>
            {orderInfo && orderInfo.pickupId && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate(`track-order/${orderInfo?.pickupId}`);
                }}
              >
                {t("track_order")}
              </Button>
            )}
            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpenEditStatusDialog}
            >
              {t("edit_order_status")}
            </Button>
            <Button variant="contained" color="error" onClick={handleClickOpen}>
              {t("delete_order")}
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Typography
        variant="h5"
        color="primary"
        sx={{ textAlign: "center", mb: 4 }}
      >
        {t("products")}
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["product", "quantity", "amount"].map(cell => (
                <TableCell
                  key={cell}
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {t(cell)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderInfo?.products?.map(item => (
              <TableRow key={item._id}>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ width: 50, height: 50 }}>
                      <Box
                        component="img"
                        crossOrigin="anonymous"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        }}
                        src={item.product.imageUrl}
                      />
                    </Box>
                    <Box>
                      <Typography>{item.product.name}</Typography>
                      <Typography>{item.amount.toFixed(2)} AED</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{item.qty}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography>
                    {(item.qty * item.amount).toFixed(2)} AED
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this order?"}
        </DialogTitle>
        <DialogContent>
          <Typography>Order ID: {orderInfo?._id}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              handleDeleteOrder();
              handleClose();
            }}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editStatusDialogOpen}
        onClose={handleCloseEditStatusDialog}
        aria-labelledby="edit-status-dialog-title"
        aria-describedby="edit-status-dialog-description"
      >
        <DialogTitle id="edit-status-dialog-title">
          {"Edit Order Status"}
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Order Status</FormLabel>
            <RadioGroup
              aria-label="order-status"
              name="order-status"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value={OrderStatusEnum.SUCCESS}
                control={<Radio />}
                label="Success"
              />
              <FormControlLabel
                value={OrderStatusEnum.IN_PROGRESS}
                control={<Radio />}
                label="In Progress"
              />
              <FormControlLabel
                value={OrderStatusEnum.FAILURE}
                control={<Radio />}
                label="Failure"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditStatusDialog} color="primary">
            No
          </Button>
          <Button onClick={handleEditOrderStatus} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetailsPage;
