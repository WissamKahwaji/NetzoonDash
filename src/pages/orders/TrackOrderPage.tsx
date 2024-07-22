import { useParams } from "react-router-dom";
import { useTrackPickUpQuery } from "../../apis/aramex/queries";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import LoadingPage from "../loading-page/LoadingPage";

const TrackOrderPage = () => {
  const { pickupId } = useParams<{ pickupId: string }>();
  const {
    data: trackInfo,
    isError,
    isLoading,
  } = useTrackPickUpQuery(pickupId!);

  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;

  const formatDate = (dateString: string) => {
    const date = new Date(
      parseInt(dateString.replace(/\/Date\((\d+)\+\d+\)\//, "$1"), 10)
    );
    return format(date, "yyyy-MM-dd");
  };

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
        Track Order
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", md: "70%" },
            boxShadow: 6,
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Reference:
            </Typography>
            <Typography>{trackInfo?.Reference}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Entity:
            </Typography>
            <Typography>{trackInfo?.Entity}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Collection Date:
            </Typography>
            <Typography>
              {formatDate(trackInfo?.CollectionDate ?? "")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Pickup Date:
            </Typography>
            <Typography>{formatDate(trackInfo?.PickupDate ?? "")}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              Last Status:
            </Typography>
            <Typography>{trackInfo?.LastStatus}</Typography>
          </Stack>
          {trackInfo?.LastStatusDescription && (
            <Stack direction="row" spacing={1}>
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                Last Status Description:
              </Typography>
              <Typography>{trackInfo?.LastStatusDescription}</Typography>
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default TrackOrderPage;
