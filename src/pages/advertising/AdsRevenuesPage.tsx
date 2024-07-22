import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useGetAdsListQuery } from "../../apis/ads/queries";
import LoadingPage from "../loading-page/LoadingPage";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";

const AdsRevenuesPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const {
    data: adsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAdsListQuery(country);

  const totalAmount = useMemo(
    () =>
      adsInfo &&
      adsInfo.results &&
      adsInfo.results.reduce((acc, curr) => acc + (curr.cost || 0), 0),
    [adsInfo]
  );

  useEffect(() => {
    refetch();
  }, [country, refetch]);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        {t("advertising_revenues")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "40px",
          width: "100%",
        }}
      >
        <Typography
          component={"h6"}
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            mb: 3,
          }}
        >
          {t("total_amount")} : {totalAmount} AED
        </Typography>
      </Box>
      <Grid container gap={4}>
        {adsInfo &&
          adsInfo.results &&
          adsInfo.results.map((ads, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <Card>
                  <CardHeader
                    title={
                      <Typography sx={{ color: "black" }}>
                        {ads.advertisingTitle!.length > 20 ? (
                          <>
                            {ads.advertisingTitle!.slice(0, 20)}
                            <Box component={"span"}>...</Box>
                          </>
                        ) : (
                          ads.advertisingTitle!
                        )}
                      </Typography>
                    }
                  />
                  <CardMedia
                    component={"img"}
                    sx={{ objectFit: "contain" }}
                    src={ads.advertisingImage}
                    height="200px"
                    crossOrigin="anonymous"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 1,
                      gap: "5px",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      {t("ads_cost")} :
                    </Typography>
                    <Typography sx={{ color: "black" }}>
                      {ads.cost} AED
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AdsRevenuesPage;
