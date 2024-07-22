/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useGetAllOrdersListQuery } from "../../apis/order/queries";
import { Link } from "react-router-dom";
import LoadingPage from "../loading-page/LoadingPage";

import {
  Box,
  // TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
// import { format } from "date-fns";
import { OrderModel } from "../../apis/order/type";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import OrderLoginPage from "./OrderLoginPage";

import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";

const OrderListPage = () => {
  const { t } = useTranslation();
  const { data: ordersInfo, isError, isLoading } = useGetAllOrdersListQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isOrderAuth") &&
      localStorage.getItem("isOrderAuth") == "true"
      ? true
      : false;
  });
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filterType, setFilterType] = useState<OrderStatusEnum | "">("");

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredOrders = ordersInfo?.filter(order =>
  //   filterType ? order.orderStatus === filterType : true
  // );

  // const grandTotal = useMemo(
  //   () =>
  //     ordersInfo && ordersInfo.reduce((acc, curr) => acc + curr.grandTotal, 0),
  //   [ordersInfo]
  // );
  const subTotal = useMemo(
    () =>
      ordersInfo && ordersInfo.reduce((acc, curr) => acc + curr.subTotal!, 0),
    [ordersInfo]
  );
  const percentageFromSellerSum = useMemo(
    () =>
      ordersInfo &&
      ordersInfo.reduce((acc, curr) => acc + curr.percentageFromSeller!, 0),
    [ordersInfo]
  );
  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;

  const calculateTotalAmount = (order: OrderModel) => {
    return (order.grandTotal || 0) + (order.serviceFee || 0);
  };
  const calculateDeliveryFee = (order: OrderModel) => {
    return (order.grandTotal || 0) - (order.subTotal || 0);
  };

  const totalAmountSum =
    ordersInfo?.reduce((sum, order) => sum + calculateTotalAmount(order), 0) ||
    0;
  const totalDeliveryFeeSum =
    ordersInfo?.reduce((sum, order) => sum + calculateDeliveryFee(order), 0) ||
    0;

  const columns: MRT_ColumnDef<OrderModel>[] = [
    {
      header: `${t("order_id")}`,
      accessorKey: "_id",
      Cell: ({ cell }) => (
        <Link to={`/orders/${cell.getValue<string>()}`}>
          {cell.getValue<string>()}
        </Link>
      ),
      enableGrouping: false,
    },
    {
      header: `${t("date")}`,
      accessorFn: originalRow => new Date(originalRow.createdAt ?? ""),
      filterVariant: "date-range",
      Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),

      enableGrouping: false,
    },
    {
      header: `${t("seller_name")}`,
      accessorKey: "clientId.username",
      Cell: ({ cell }) => cell.getValue<string>(),
      enableGrouping: true,
    },
    {
      header: `${t("buyer_name")}`,
      accessorKey: "userId.username",
      Cell: ({ cell }) => cell.getValue<string>(),
      enableGrouping: false,
    },

    {
      header: `${t("seller_ammount")}`,
      accessorKey: "subTotal",
      filterFn: "between",
      Cell: ({ cell }) => (
        <>
          {cell.getValue<number>()?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </>
      ),

      AggregatedCell: ({ cell }) => (
        <>
          {t("seller_ammount")} :{" "}
          <Box sx={{ color: "success.main", fontWeight: "bold" }}>
            {cell.getValue<number>()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          {t("sellers_amounts_sum")} :
          <Box color="warning.main">
            {subTotal?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </Stack>
      ),
      enableGrouping: false,
    },
    {
      header: `${t("percentage_from_the_seller")}`,
      accessorKey: "percentageFromSeller",
      filterFn: "between",
      Cell: ({ cell }) => (
        <>
          {cell.getValue<number>()?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </>
      ),

      AggregatedCell: ({ cell }) => (
        <>
          {t("percentage_from_the_seller")} :{" "}
          <Box sx={{ color: "success.main", fontWeight: "bold" }}>
            {cell.getValue<number>()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          {t("percentage_from_the_seller_sum")} :
          <Box color="warning.main">
            {percentageFromSellerSum?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Box>
        </Stack>
      ),
      enableGrouping: false,
    },
    {
      header: `${t("service_fee")}`,
      accessorKey: "serviceFee",
      filterFn: "between",
      Cell: ({ cell }) => (
        <>
          {cell.getValue<number>()?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </>
      ),

      AggregatedCell: ({ cell }) => (
        <>
          {t("service_fee")} :{" "}
          <Box sx={{ color: "success.main", fontWeight: "bold" }}>
            {cell.getValue<number>()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          {t("service_fee_sum")} :
          <Box color="warning.main">
            {subTotal?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </Stack>
      ),
      enableGrouping: false,
    },
    {
      header: `${t("delivery_fee")}`,
      accessorFn: row => calculateDeliveryFee(row),
      filterFn: "between",
      Cell: ({ cell }) => (
        <>
          {cell.getValue<number>()?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </>
      ),

      AggregatedCell: ({ cell }) => (
        <>
          {t("delivery_fee")} :{" "}
          <Box sx={{ color: "success.main", fontWeight: "bold" }}>
            {cell.getValue<number>()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          {t("total_delivery_fee")} :
          <Box color="warning.main">
            {totalDeliveryFeeSum?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </Stack>
      ),
      enableGrouping: false,
    },
    // {
    //   header: "Grand Total",
    //   accessorKey: "grandTotal",
    //   filterFn: "between",
    //   Cell: ({ cell }) => (
    //     <>
    //       {cell.getValue<number>()?.toLocaleString?.("en-US", {
    //         style: "currency",
    //         currency: "AED",
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //       })}
    //     </>
    //   ),

    //   AggregatedCell: ({ cell }) => (
    //     <>
    //       Grand Total :{" "}
    //       <Box sx={{ color: "success.main", fontWeight: "bold" }}>
    //         {cell.getValue<number>()?.toLocaleString?.("en-US", {
    //           style: "currency",
    //           currency: "AED",
    //           minimumFractionDigits: 0,
    //           maximumFractionDigits: 0,
    //         })}
    //       </Box>
    //     </>
    //   ),
    //   Footer: () => (
    //     <Stack>
    //       Grand Total:
    //       <Box color="warning.main">
    //         {grandTotal?.toLocaleString?.("en-US", {
    //           style: "currency",
    //           currency: "AED",
    //           minimumFractionDigits: 0,
    //           maximumFractionDigits: 0,
    //         })}
    //       </Box>
    //     </Stack>
    //   ),
    //   enableGrouping: false,
    // },
    {
      header: `${t("total_amount")}`,
      accessorFn: row => calculateTotalAmount(row),
      filterFn: "between",
      Cell: ({ cell }) => (
        <>
          {cell.getValue<number>()?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </>
      ),

      AggregatedCell: ({ cell }) => (
        <>
          {t("total_amount")} :{" "}
          <Box sx={{ color: "success.main", fontWeight: "bold" }}>
            {cell.getValue<number>()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </>
      ),
      Footer: () => (
        <Stack>
          {t("total_amount")} :
          <Box color="warning.main">
            {totalAmountSum?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "AED",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        </Stack>
      ),
      enableGrouping: false,
    },
    {
      header: `${t("shipping_address")}`,
      accessorKey: "shippingAddress",
      Cell: ({ cell }) => cell.getValue<string>(),
      enableGrouping: false,
    },

    {
      header: `${t("order_status")}`,
      accessorKey: "orderStatus",
      filterVariant: "select",
      filterSelectOptions: ["success", "inProgress", "failure"],

      Cell: ({ cell }) => cell.getValue<string>(),
      enableGrouping: false,
    },
  ];

  type RowType = {
    _id: string;
    createdAt: string;
    "userId.username": string;
    "clientId.username": string;
    shippingAddress?: string;
    subTotal: string;
    totalAmount: string;
    orderStatus?: string;
  };

  const rows: RowType[] = ordersInfo!.map(order => ({
    _id: order._id,
    createdAt: new Date(order.createdAt ?? "").toLocaleDateString(),
    "userId.username": order.userId.username,
    "clientId.username": order.clientId.username,
    shippingAddress: order.shippingAddress,
    subTotal: order.subTotal!.toLocaleString("en-US", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    totalAmount: calculateTotalAmount(order).toLocaleString("en-US", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    orderStatus: order.orderStatus,
  }));

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = [
      { header: `order_id`, dataKey: "_id" },

      { header: `buyer_name`, dataKey: "userId.username" },
      { header: `seller_name`, dataKey: "clientId.username" },
      { header: `shipping_address`, dataKey: "shippingAddress" },
      { header: `seller_amount`, dataKey: "subTotal" },
      { header: `total_amount`, dataKey: "totalAmount" },
    ];

    const tableData = rows.map(row =>
      columns.map(col => (row[col.dataKey as keyof RowType] ?? "").toString())
    );

    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: tableData,
      didDrawPage: data => {
        // Add footer
        const { pageCount, settings } = data;
        const footerText = `Total Seller Amount: ${subTotal!.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }
        )} | Total Amount: ${totalAmountSum.toLocaleString("en-US", {
          style: "currency",
          currency: "AED",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;

        doc.setFontSize(10);
        doc.text(
          footerText,
          settings.margin.left,
          doc.internal.pageSize.height - 20
        );
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save("orders.pdf");
  };
  const handleExportRows = (rows: MRT_Row<OrderModel>[]) => {
    const columns = [
      { header: `${t("order_id")}`, dataKey: "_id" },
      { header: `${t("buyer_name")}`, dataKey: "userId.username" },
      { header: `${t("seller_name")}`, dataKey: "clientId.username" },
      { header: `${t("shipping_address")}`, dataKey: "shippingAddress" },
      { header: `${t("seller_amount")}`, dataKey: "subTotal" },
      { header: `${t("total_amount")}`, dataKey: "totalAmount" },
    ];

    const doc = new jsPDF();

    // Compute totalAmount for each row
    const tableData = rows.map(row => {
      const original = row.original;
      return [
        original._id,
        original.userId?.username ?? "",
        original.clientId?.username ?? "",
        original.shippingAddress ?? "",
        original.subTotal ?? "",
        calculateTotalAmount(original), // Compute totalAmount here
      ].map(value => (value ?? "").toString());
    });

    const tableHeaders = columns.map(c => c.header as string);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      didDrawPage: data => {
        // Add footer
        const { pageCount, settings } = data;
        const footerText = `Total Seller Amount: ${subTotal!.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "AED",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }
        )} | Total Amount: ${totalAmountSum.toLocaleString("en-US", {
          style: "currency",
          currency: "AED",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;

        doc.setFontSize(10);
        doc.text(
          footerText,
          settings.margin.left,
          doc.internal.pageSize.height - 20
        );
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save("orders-export.pdf");
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <OrderLoginPage onLogin={setIsAuthenticated} />
        </>
      ) : (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: "100%", px: 2, py: 4, direction: "ltr" }}>
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

              {/* <Box
        sx={{ display: "flex", justifyContent: "center", mb: 4, width: "100%" }}
      >
        <FormControl sx={{ width: "20%" }}>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={e => setFilterType(e.target.value as OrderStatusEnum)}
            displayEmpty
            inputProps={{ "aria-label": "Order Status" }}
            IconComponent={ExpandMoreIcon}
            sx={{ width: "100%" }}
          >
            <MenuItem value={""}>ALL</MenuItem>
            <MenuItem value={OrderStatusEnum.SUCCESS}>SUCCESS</MenuItem>
            <MenuItem value={OrderStatusEnum.IN_PROGRESS}>IN PROGRESS</MenuItem>
            <MenuItem value={OrderStatusEnum.FAILURE}>FAILURE</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
              <MaterialReactTable
                columns={columns}
                data={ordersInfo || []}
                enablePagination={true}
                enableGrouping={true}
                enableStickyHeader={true}
                enableStickyFooter={true}
                enableSorting={true}
                enableColumnOrdering
                columnFilterDisplayMode="popover"
                enableRowSelection
                positionToolbarAlertBanner="bottom"
                enableFilterMatchHighlighting={true}
                paginationDisplayMode="pages"
                renderTopToolbarCustomActions={({ table }) => {
                  return (
                    <Stack
                      sx={{
                        display: "flex",
                        gap: "16px",
                        padding: "8px",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={generatePDF}
                      >
                        {t("download_pdf")}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleExportRows(table.getSelectedRowModel().rows)
                        } // Replace [] with selected rows
                      >
                        {t("export_selected_rows")}
                      </Button>
                    </Stack>
                  );
                }}
                muiTableProps={{
                  sx: {
                    "& .MuiTableFooter-root": {
                      backgroundColor: "#f0f0f0", // Change this to your desired footer background color
                      "& .MuiTableCell-footer": {
                        color: "primary.main", // Change this to your desired footer text color
                        fontWeight: "bold",
                      },
                    },
                    "& .MuiTableRow-root": {
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    },
                  },
                }}
              />
            </Box>
          </LocalizationProvider>
        </>
      )}
    </>
  );
};

export default OrderListPage;
