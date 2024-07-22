import { Box, Grid, Typography } from "@mui/material";
import { useGetComplaintsInfoQuery } from "../../apis/complaints/queries";
import LoadingPage from "../loading-page/LoadingPage";

import ComplaintCard from "../../components/items/cards/complaint_card";
import { useTranslation } from "react-i18next";

const ComplaintsPage = () => {
  const { t } = useTranslation();
  const {
    data: complaintsInfo,
    isError,
    isLoading,
  } = useGetComplaintsInfoQuery();

  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%", px: 2 }}>
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
        {t("complaints")}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {complaintsInfo && complaintsInfo.length > 0 ? (
          complaintsInfo.map((complaint, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ComplaintCard complaint={complaint} />
            </Grid>
          ))
        ) : (
          <Typography
            component="h5"
            sx={{
              textAlign: "center",
              fontSize: "1.25rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              mt: 4,
              color: "text.secondary",
              width: "100%",
            }}
          >
            There are no complaints yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ComplaintsPage;
