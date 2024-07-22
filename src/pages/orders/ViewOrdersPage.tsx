import { useState } from "react";
import { useGetAllOrdersListQuery } from "../../apis/order/queries";

import LoadingPage from "../loading-page/LoadingPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { format } from "date-fns";
import { OrderStatusEnum } from "../../apis/order/type";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ViewOrdersPage = () => {
  const { t } = useTranslation();
  const { data: ordersInfo, isError, isLoading } = useGetAllOrdersListQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<OrderStatusEnum | "">("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = ordersInfo?.filter(
    order =>
      (order._id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType ? order.orderStatus === filterType : true)) ||
      (order.userId.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType ? order.orderStatus === filterType : true)) ||
      (order.clientId.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
        (filterType ? order.orderStatus === filterType : true))
  );

  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%", px: 2, py: 4 }}>
      <Typography
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 4,
          color: "primary.main",
        }}
      >
        {t("all_orders")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label={t("search_by_order_id_or_seller_name_or_buyer_name")}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { lg: "50%", xs: "100%" } }}
        />
        <Box sx={{ marginRight: "8px", marginBottom: "10px" }}>
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value as OrderStatusEnum)}
            displayEmpty
            inputProps={{ "aria-label": "Order Status" }}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={""}>{t("all")}</MenuItem>
            <MenuItem value={OrderStatusEnum.SUCCESS}>{t("success")}</MenuItem>
            <MenuItem value={OrderStatusEnum.IN_PROGRESS}>
              {t("in_progress")}
            </MenuItem>
            <MenuItem value={OrderStatusEnum.FAILURE}>{t("failed")}</MenuItem>
          </Select>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {filteredOrders &&
          [...filteredOrders].reverse().map(order => (
            <Grid item xs={12} lg={6} key={order._id}>
              <Link
                to={`/orders/${order._id}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Stack direction={"row"} spacing={1} flexWrap="wrap">
                    <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                      {t("order_id")} :
                    </Typography>
                    <Typography>{order._id}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                      {t("date")} :
                    </Typography>
                    <Typography>
                      {format(new Date(order.createdAt!), "PPP")}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                      {t("seller_name")} :
                    </Typography>
                    <Typography>{order.clientId.username}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography color="primary" sx={{ fontWeight: "bold" }}>
                      {t("sub_total_to_seller")}:
                    </Typography>
                    <Typography>
                      {order?.subTotal?.toLocaleString?.("en-US", {
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
                      {order?.serviceFee?.toLocaleString?.("en-US", {
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
                      {(
                        order.grandTotal - (order.subTotal ?? 0)
                      ).toLocaleString?.("en-US", {
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
                      {order?.grandTotal?.toLocaleString?.("en-US", {
                        style: "currency",
                        currency: "AED",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography color={"primary"} sx={{ fontWeight: "bold" }}>
                      {t("total_amount")} :
                    </Typography>
                    <Typography>
                      {" "}
                      {order.grandTotal + (order.serviceFee ?? 0)}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ViewOrdersPage;
